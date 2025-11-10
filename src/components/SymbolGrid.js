import React, { useState, useEffect } from 'react';
import './SymbolGrid.css';

// 전체 어휘 목록
const VOCABULARY = ["안녕하세요", "고마워요", "미안합니다", "좋아요", "싫어요", "도와주세요", "배고파요"];

// 방해 자극용 어휘 (AI 폴더에 있는 모든 단어 - 본 실험 단어 제외)
const DISTRACTOR_POOL = [
  "가요", "가져왔어요", "괜찮아요", "나가요", "나와요", "놀아요", "놓아요",
  "들어요", "마셔요", "먹어요", "몰라요", "바라봐요", "받아요",
  "아파요", "안돼요", "알아요", "와요", "없어요", "있어요",
  "작아요", "좋아해요", "주세요", "커요"
];

function SymbolGrid({ targetWord, symbolType, onSelect }) {
  const [symbols, setSymbols] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [isSelectable, setIsSelectable] = useState(true);

  useEffect(() => {
    generateSymbolArray();
    setStartTime(Date.now());
    setErrorCount(0);
    setIsSelectable(true);
    setSelectedIndex(null);
  }, [targetWord, symbolType]);

  const generateSymbolArray = () => {
    // 목표 상징을 제외한 방해 자극 풀 (본 실험 단어 + 연습 단어 모두 제외)
    const availableDistractors = DISTRACTOR_POOL.filter(w => w !== targetWord);
    
    // 셔플
    const shuffled = [...availableDistractors].sort(() => Math.random() - 0.5);
    
    // 15개 선택
    const selected_distractors = shuffled.slice(0, 7);
    
    // 목표 상징 추가
    const all_symbols = [...selected_distractors, targetWord];
    
    // 전체 다시 셔플 (목표 위치 랜덤화)
    const final_array = all_symbols.sort(() => Math.random() - 0.5);
    
    setSymbols(final_array);
  };

  const handleSymbolClick = (index, word) => {
    if (!isSelectable) return;

    // 반응시간 계산 (밀리초)
    const reactionTime = Date.now() - startTime;
    
    setSelectedIndex(index);
    const isCorrect = word === targetWord;
    
    // 오답 처리
    if (!isCorrect) {
      setErrorCount(prev => prev + 1);
      alert('다시 선택해주세요!');
      
      // 0.5초 후 다시 선택 가능
      setIsSelectable(false);
      setTimeout(() => {
        setSelectedIndex(null);
        setIsSelectable(true);
      }, 500);
      return;
    }
    
    // 정답 처리
    setIsSelectable(false);
    setTimeout(() => {
      onSelect(word, true, reactionTime, errorCount);
    }, 300);
  };

  return (
    <div className="symbol-grid-container">
      <div className="symbol-grid">
        {symbols.map((word, index) => {
          // 파일명 그대로 사용
          const imagePath = `/images/${symbolType}/${word}.png`;
          
          return (
            <div
              key={index}
              className={`symbol-cell ${selectedIndex === index ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''}`}
              onClick={() => handleSymbolClick(index, word)}
            >
              <img
                src={imagePath}
                alt={word}
                onError={(e) => {
                  // 이미지 로드 실패 시 텍스트 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="symbol-placeholder" style={{display: 'none'}}>
                {word}
              </div>
            </div>
          );
        })}
      </div>
      
      {errorCount > 0 && (
        <div className="error-feedback">
          오답 {errorCount}회
        </div>
      )}
    </div>
  );
}

export default SymbolGrid;