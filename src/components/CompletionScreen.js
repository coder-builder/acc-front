import React, { useEffect, useState } from 'react';
import './CompletionScreen.css';
import { apiClient, API_ENDPOINTS } from '../config/api';


const API_URL = process.env.REACT_APP_API_URL || 'http://223.130.131.18/api';

function CompletionScreen({ experimentData }) {
  const [status, setStatus] = useState('sending'); // sending, success, error
  const [message, setMessage] = useState('데이터를 전송하는 중...');
  const [participantId, setParticipantId] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      try {
        console.log('📤 Sending experiment data...', experimentData);

        // 1. 실험 데이터 전송 (participant 생성 + trial 저장)
        const mainResponse = await fetch(`${API_URL}/complete-experiment/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            demographic: experimentData.demographic,
            practice_results: experimentData.practiceResults,
            trial_results: experimentData.trialResults,
            // 시작/완료 시간 포함
            start_time: experimentData.startTime,
            end_time: experimentData.endTime
          })
        });

        if (!mainResponse.ok) {
          throw new Error('실험 데이터 전송 실패');
        }

        const mainData = await mainResponse.json();
        const newParticipantId = mainData.participant_id;
        setParticipantId(newParticipantId);
        
        console.log('✅ Main data saved. Participant ID:', newParticipantId);

        // 2. 단어별 선호도 전송 (symbolPreferences)
        if (experimentData.symbolPreferences && 
            experimentData.symbolPreferences.length === 7) {
          
          console.log('📤 Sending symbol preferences...', experimentData.symbolPreferences);
          
          const prefResponse = await fetch(`${API_URL}/submit-symbol-preferences/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              participant_id: newParticipantId,
              preferences: experimentData.symbolPreferences
            })
          });

          if (!prefResponse.ok) {
            console.error('⚠️ Symbol preferences 전송 실패');
            // 이건 실패해도 계속 진행 (선호도는 선택사항)
          } else {
            const prefData = await prefResponse.json();
            console.log('✅ Symbol preferences saved:', prefData);
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
            <h1>데이터 전송 중...</h1>
            <p>{message}</p>
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