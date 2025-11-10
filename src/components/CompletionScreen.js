import React, { useEffect, useState } from 'react';
import './CompletionScreen.css';
import { apiClient, API_ENDPOINTS } from '../config/api';

function CompletionScreen({ experimentData }) {
  const [status, setStatus] = useState('sending');
  const [message, setMessage] = useState('데이터를 전송하는 중');
  const [participantId, setParticipantId] = useState(null);
  const [dots, setDots] = useState('');

  // 로딩 애니메이션 (. .. ...)
  useEffect(() => {
    if (status === 'sending') {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    const sendData = async () => {
      try {
        console.log('📤 Sending experiment data...', experimentData);

        // 1. 실험 데이터 전송
        const mainData = await apiClient.post(API_ENDPOINTS.completeExperiment, {
          demographic: experimentData.demographic,
          practice_results: experimentData.practiceResults,
          trial_results: experimentData.trialResults,
          start_time: experimentData.startTime,
          end_time: experimentData.endTime
        });

        const newParticipantId = mainData.participant_id;
        setParticipantId(newParticipantId);
        
        console.log('✅ Main data saved. Participant ID:', newParticipantId);

        // 2. 단어별 선호도 전송
        if (experimentData.symbolPreferences && 
            experimentData.symbolPreferences.length === 7) {
          
          console.log('📤 Sending symbol preferences...', experimentData.symbolPreferences);
          
          try {
            const prefData = await apiClient.post(API_ENDPOINTS.submitSymbolPreferences, {
              participant_id: newParticipantId,
              preferences: experimentData.symbolPreferences
            });
            
            console.log('✅ Symbol preferences saved:', prefData);
          } catch (prefError) {
            console.error('⚠️ Symbol preferences 전송 실패:', prefError);
          }
        } else {
          console.log('⚠️ No symbol preferences to send');
        }

        // 성공!
        setStatus('success');
        setMessage('모든 데이터가 성공적으로 저장되었습니다! 🎉');

      } catch (error) {
        console.error('❌ Error sending data:', error);
        setStatus('error');
        setMessage(`데이터 전송 중 오류가 발생했습니다: ${error.message}`);
      }
    };

    sendData();
  }, [experimentData]);

  // 총 소요 시간 계산
  const calculateDuration = () => {
    if (experimentData.startTime && experimentData.endTime) {
      const start = new Date(experimentData.startTime);
      const end = new Date(experimentData.endTime);
      const durationMs = end - start;
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      return `${minutes}분 ${seconds}초`;
    }
    return '계산 중...';
  };

  return (
    <div className="completion-container">
      <div className="completion-content">
        {status === 'sending' && (
          <>
            <div className="spinner">⏳</div>
            <h1>데이터를 전송하는 중{dots}</h1>
            <p className="loading-time">약 10~15초 소요됩니다</p>
            <p className="loading-subtitle">잠시만 기다려주세요</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="completion-icon">✅</div>
            <h1>실험이 완료되었습니다!</h1>
            
            <div className="completion-message">
              <p>참여해 주셔서 감사합니다.</p>
              <p>귀하의 응답이 소중한 연구 자료로 활용될 예정입니다.</p>
            </div>

            <div className="completion-stats">
              <div className="stat-item">
                <span className="stat-label">참가자 ID</span>
                <span className="stat-value">{participantId || '생성 중...'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">완료한 시행</span>
                <span className="stat-value">{experimentData.trialResults?.length || 0}개</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">선호도 응답</span>
                <span className="stat-value">{experimentData.symbolPreferences?.length || 0}개</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">총 소요 시간</span>
                <span className="stat-value">{calculateDuration()}</span>
              </div>
            </div>

            <div className="completion-footer">
              <p className="footer-text">
                문의사항이 있으시면 연구자에게 연락해 주세요.
              </p>
              <p className="footer-contact">
                이메일: hankil2002@daegu.ac.kr
              </p>
            </div>

            <button 
              className="btn-close"
              onClick={() => window.close()}
            >
              창 닫기
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="completion-icon error">❌</div>
            <h1>오류 발생</h1>
            <p className="error-message">{message}</p>
            <p>연구자에게 문의해주세요.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CompletionScreen;