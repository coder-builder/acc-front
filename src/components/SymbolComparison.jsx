import React, { useState } from 'react';
import './SymbolComparison.css';

const VOCABULARY = [
  "안녕하세요",
  "고마워요", 
  "미안합니다",
  "좋아요",
  "싫어요",
  "도와주세요",
  "배고파요"
];

function SymbolComparison({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);  // 중복 클릭 방지

  const currentWord = VOCABULARY[currentIndex];
  const progress = Math.round(((currentIndex + 1) / VOCABULARY.length) * 100);

  // AI/KAAC 랜덤 위치 (왼쪽/오른쪽)
  const [leftRight] = useState(() => {
    // 각 단어마다 AI가 왼쪽일지 오른쪽일지 미리 결정
    return VOCABULARY.map(() => Math.random() < 0.5);
  });

  const isAILeft = leftRight[currentIndex];

  const handleSelect = (choice) => {
    if (isProcessing) return;  // 이미 처리 중이면 무시
    
    setIsProcessing(true);
    setSelectedOption(choice);
    
    // 선택 후 0.5초 뒤 자동으로 다음으로!
    setTimeout(() => {
      handleNext(choice);
      setIsProcessing(false);
    }, 500);
  };

  const handleNext = (choice) => {
    // 응답 저장
    let chosenType;
    if (choice === 'similar') {
      chosenType = 'similar';
    } else if (choice === 'left') {
      chosenType = isAILeft ? 'ai' : 'kaac';
    } else {
      chosenType = isAILeft ? 'kaac' : 'ai';
    }

    const newResponse = {
      target_word: currentWord,
      ai_position: isAILeft ? 'left' : 'right',
      chosen: choice,
      chosen_type: chosenType
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    // 다음 단어 또는 완료
    if (currentIndex < VOCABULARY.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // 완료!
      console.log('Symbol comparison complete:', newResponses);
      onComplete(newResponses);
    }
  };

  return (
    <div className="comparison-container">
      {/* 진행 상황 */}
      <div className="comparison-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          {currentIndex + 1} / {VOCABULARY.length}
        </p>
      </div>

      {/* 질문 */}
      <div className="question-box">
        <h2>"{currentWord}"을(를) 더 잘 나타내는 그림은?</h2>
        <p className="instruction">선택지를 클릭해주세요</p>
      </div>

      {/* 이미지 비교 + 비슷하다 버튼 - 한 줄! */}
      <div className="options-container">
        {/* 왼쪽 이미지 */}
        <div 
          className={`image-option ${selectedOption === 'left' ? 'selected' : ''} ${isProcessing ? 'disabled' : ''}`}
          onClick={() => handleSelect('left')}
        >
          <div className="image-wrapper">
            <img 
              src={`/images/${isAILeft ? 'ai' : 'kaac'}/${currentWord}.png`}
              alt={isAILeft ? "AI 생성 상징" : "KAAC 상징"}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder" style={{display: 'none'}}>
              {isAILeft ? 'AI 상징' : 'KAAC 상징'}
            </div>
          </div>
          {selectedOption === 'left' && (
            <div className="selection-check">✓</div>
          )}
        </div>

        {/* 오른쪽 이미지 */}
        <div 
          className={`image-option ${selectedOption === 'right' ? 'selected' : ''} ${isProcessing ? 'disabled' : ''}`}
          onClick={() => handleSelect('right')}
        >
          <div className="image-wrapper">
            <img 
              src={`/images/${isAILeft ? 'kaac' : 'ai'}/${currentWord}.png`}
              alt={isAILeft ? "KAAC 상징" : "AI 생성 상징"}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder" style={{display: 'none'}}>
              {isAILeft ? 'KAAC 상징' : 'AI 상징'}
            </div>
          </div>
          {selectedOption === 'right' && (
            <div className="selection-check">✓</div>
          )}
        </div>

        {/* 비슷하다 버튼 */}
        <div 
          className={`similar-option ${selectedOption === 'similar' ? 'selected' : ''} ${isProcessing ? 'disabled' : ''}`}
          onClick={() => handleSelect('similar')}
        >
          <div className="similar-content">
            {selectedOption === 'similar' && <span className="check-icon">✓</span>}
            <span>비슷하다</span>
          </div>
        </div>
      </div>

      {/* 안내문 */}
      <p className="note">
        💡 주관적인 판단으로 선택해주세요. 정답은 없습니다.
      </p>
    </div>
  );
}

export default SymbolComparison;