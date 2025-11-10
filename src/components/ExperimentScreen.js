import React, { useState, useEffect, useRef } from 'react';
import SymbolGrid from './SymbolGrid';
import './ExperimentScreen.css';

const VOCABULARY = ["안녕하세요", "고마워요", "미안합니다", "좋아요", "싫어요", "도와주세요", "배고파요"];

function ExperimentScreen({ blockOrder, onComplete }) {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [trials, setTrials] = useState([]);
  const [results, setResults] = useState([]);
  
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    console.log('🔵 ExperimentScreen mounted, blockOrder:', blockOrder);
    
    if (!blockOrder) {
      console.log('⚠️ blockOrder is undefined, waiting...');
      return;
    }

    const trialSequence = blockOrder === 1 
      ? [
          ...VOCABULARY.map(word => ({ word, type: 'ai' })),
          ...VOCABULARY.map(word => ({ word, type: 'kaac' }))
        ]
      : [
          ...VOCABULARY.map(word => ({ word, type: 'kaac' })),
          ...VOCABULARY.map(word => ({ word, type: 'ai' }))
        ];
    
    console.log('✅ Trials created:', trialSequence.length, 'trials');
    setTrials(trialSequence);
    setCurrentTrial(0);
    setResults([]);
    hasCompletedRef.current = false;
  }, [blockOrder]);

  const handleSymbolSelect = (selectedSymbol, isCorrect, reactionTime, errorCount) => {
    if (hasCompletedRef.current) {
      console.log('⚠️ Already completed, ignoring...');
      return;
    }

    const trial = trials[currentTrial];
    console.log(`📍 Trial ${currentTrial + 1}/${trials.length}:`, trial.word, trial.type);
    
    const trialData = {
      target_word: trial.word,
      symbol_type: trial.type,
      selected_symbol: selectedSymbol,
      is_correct: isCorrect,
      reaction_time: reactionTime,
      error_count: errorCount,
      presented_symbols: []
    };

    const newResults = [...results, trialData];
    setResults(newResults);

    if (currentTrial < trials.length - 1) {
      console.log(`➡️ Moving to next trial: ${currentTrial + 2}/${trials.length}`);
      setCurrentTrial(currentTrial + 1);
    } else {
      console.log('🎉 Experiment complete! Total results:', newResults.length);
      hasCompletedRef.current = true;
      onComplete(newResults);
    }
  };

  if (!blockOrder) {
    return <div className="loading">참가자 정보를 불러오고 있습니다...</div>;
  }

  if (trials.length === 0) {
    return <div className="loading">실험을 준비하고 있습니다...</div>;
  }

  const trial = trials[currentTrial];
  const progress = Math.round((currentTrial / trials.length) * 100);

  return (
    <div className="experiment-container">
      <div className="experiment-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          {currentTrial + 1} / {trials.length}
        </p>
        <h2 className="target-instruction">
          "<span className="target-word">{trial.word}</span>" 을(를) 의미하는 그림을 선택해주세요
        </h2>
      </div>

      <SymbolGrid 
        targetWord={trial.word}
        symbolType={trial.type}
        onSelect={handleSymbolSelect}
      />
    </div>
  );
}

export default ExperimentScreen;