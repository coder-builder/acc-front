import React from 'react';
import './ExperimentIntro.css';

function ExperimentIntro({ onStart }) {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="intro-icon">🎯</div>
        
        <h1>이제 본 실험을 시작하겠습니다</h1>
        
        <div className="intro-message">
          <p>연습이 끝났습니다. 잘 하셨습니다! 👏</p>
          <p>이제부터는 실제 실험 데이터가 수집됩니다.</p>
        </div>

        <div className="intro-instructions">
          <h3>📌 주의사항</h3>
          <ul>
            <li>총 <strong>14개</strong>의 문제가 제시됩니다</li>
            <li>각 문제마다 <strong>가능한 한 빠르고 정확하게</strong> 답해주세요</li>
            <li>정답을 모르더라도 <strong>직관적으로</strong> 선택해주세요</li>
            <li>중간에 <strong>휴식 시간은 없으니</strong> 준비가 되셨을 때 시작해주세요</li>
          </ul>
        </div>

        <div className="intro-ready">
          <p className="ready-text">준비되셨나요?</p>
          <p className="ready-subtext">확인 버튼을 누르면 즉시 실험이 시작됩니다</p>
        </div>

        <button 
          className="btn-start"
          onClick={onStart}
        >
          ✅ 확인 - 본 실험 시작하기
        </button>
      </div>
    </div>
  );
}

export default ExperimentIntro;