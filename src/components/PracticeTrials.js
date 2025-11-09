import React, { useState } from 'react';
import SymbolGrid from './SymbolGrid';
import './PracticeTrials.css';

const PRACTICE_WORDS = ["가요", "와요"];

function PracticeTrials({ onComplete }) {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [results, setResults] = useState([]);

  const handleSymbolSelect = (selectedSymbol, isCorrect, reactionTime, errorCount) => {
    const trialData = {
      target_word: PRACTICE_WORDS[currentTrial],
      symbol_type: 'practice',
      selected_symbol: selectedSymbol,
      is_correct: isCorrect,
      reaction_time: reactionTime,
      error_count: errorCount,
      presented_symbols: []
    };

    const newResults = [...results, trialData];
    setResults(newResults);

    // 다음 시행 또는 완료
    if (currentTrial < PRACTICE_WORDS.length - 1) {
      setCurrentTrial(currentTrial + 1);
    } else {
      // 연습 완료 - 결과를 부모에게 전달
      onComplete(newResults);
    }
  };

  return (
    <>
      {/* 가로 모드 전환 안내 (모바일 세로일 때만) */}
      <div className="rotate-message">
        <div className="rotate-icon">📱 → 🔄</div>
        <h2>화면을 가로로 돌려주세요</h2>
        <p>실험을 진행하려면 가로 모드가 필요합니다</p>
      </div>

      <div className="practice-container">
        <div className="practice-header">
          <h2>연습 시행</h2>
          <p>"{PRACTICE_WORDS[currentTrial]}" 찾기</p>
          <div className="progress">
            {currentTrial + 1} / {PRACTICE_WORDS.length}
          </div>
        </div>

        <SymbolGrid 
          targetWord={PRACTICE_WORDS[currentTrial]}
          symbolType={currentTrial === 0 ? "ai" : "kaac"}
          onSelect={handleSymbolSelect}
        />
      </div>
    </>
  );
}

export default PracticeTrials;