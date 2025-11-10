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
    <div className="practice-container">
      <div className="practice-header">
        <h2>연습 시행</h2>
        <p className="target-instruction">
          "<span className="target-word">{PRACTICE_WORDS[currentTrial]}</span>" 을(를) 의미하는 그림을 선택해주세요
        </p>
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
  );
}

export default PracticeTrials;