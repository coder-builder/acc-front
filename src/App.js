import React, { useState } from 'react';
import './App.css';
import ConsentForm from './components/ConsentForm';
import DemographicForm from './components/DemographicForm';
import Instructions from './components/Instructions';
import PracticeTrials from './components/PracticeTrials';
import ExperimentIntro from './components/ExperimentIntro';  // ← 추가!
import ExperimentScreen from './components/ExperimentScreen';
import SymbolComparison from './components/SymbolComparison';
import CompletionScreen from './components/CompletionScreen';

function App() {
  const [stage, setStage] = useState('consent');
  const [blockOrder, setBlockOrder] = useState(null);
  const [startTime, setStartTime] = useState(null);
  
  const [experimentData, setExperimentData] = useState({
    demographic: null,
    practiceResults: [],
    trialResults: [],
    symbolPreferences: null,
    startTime: null,
    endTime: null
  });

  const handleConsentComplete = () => {
    // 실험 시작 시간 기록
    const now = new Date().toISOString();
    setStartTime(now);
    setExperimentData(prev => ({
      ...prev,
      startTime: now
    }));
    setStage('demographic');
  };

  const handleDemographicComplete = (data) => {
    const timestamp = Date.now();
    const calculatedBlockOrder = timestamp % 2 === 0 ? 1 : 2;
    
    setBlockOrder(calculatedBlockOrder);
    
    setExperimentData(prev => ({
      ...prev,
      demographic: {
        ...data,
        block_order: calculatedBlockOrder
      }
    }));
    setStage('instructions');
  };

  const handleInstructionsComplete = () => {
    setStage('practice');
  };

  const handlePracticeComplete = (results) => {
    setExperimentData(prev => ({
      ...prev,
      practiceResults: results
    }));
    setStage('experiment-intro');  // ← 본 실험 안내로!
  };

  // ← 새로 추가!
  const handleExperimentIntroComplete = () => {
    setStage('experiment');
  };

  const handleExperimentComplete = (results) => {
    setExperimentData(prev => ({
      ...prev,
      trialResults: results
    }));
    setStage('preference');
  };

  const handleSymbolPreferenceComplete = (preferences) => {
    console.log('Symbol preferences:', preferences);
    
    // 실험 완료 시간 기록
    const now = new Date().toISOString();
    
    setExperimentData(prev => ({
      ...prev,
      symbolPreferences: preferences,
      endTime: now
    }));
    setStage('complete');
  };

  return (
    <div className="App">
      {stage === 'consent' && (
        <ConsentForm onComplete={handleConsentComplete} />
      )}
      
      {stage === 'demographic' && (
        <DemographicForm onComplete={handleDemographicComplete} />
      )}
      
      {stage === 'instructions' && (
        <Instructions onComplete={handleInstructionsComplete} />
      )}
      
      {stage === 'practice' && (
        <PracticeTrials 
          onComplete={handlePracticeComplete} 
        />
      )}
      
      {/* ← 새로 추가! */}
      {stage === 'experiment-intro' && (
        <ExperimentIntro 
          onStart={handleExperimentIntroComplete}
        />
      )}
      
      {stage === 'experiment' && (
        <ExperimentScreen 
          key={`experiment-${blockOrder}`}
          blockOrder={blockOrder}
          onComplete={handleExperimentComplete}
        />
      )}
      
      {stage === 'preference' && (
        <SymbolComparison
          onComplete={handleSymbolPreferenceComplete}
        />
      )}
      
      {stage === 'complete' && (
        <CompletionScreen 
          experimentData={experimentData}
        />
      )}
    </div>
  );
}

export default App;