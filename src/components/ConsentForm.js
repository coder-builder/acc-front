import React, { useState } from 'react';
import './ConsentForm.css';

function ConsentForm({ onComplete }) {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (agreed) {
      onComplete();
    } else {
      alert('연구 참여에 동의해주셔야 진행할 수 있습니다.');
    }
  };

  return (
    <div className="consent-container">
      <div className="consent-content">
        <h1>연구 참여 동의서</h1>
        
        <div className="consent-text">
          <h2>연구 제목</h2>
          <p>생성형 AI를 활용한 AAC 그림 상징의 이해도 검증 연구</p>
          
          <h2>연구 목적</h2>
          <p>
            본 연구는 생성형 인공지능을 활용하여 제작한 AAC(보완대체의사소통) 그림 상징이 
            기존 AAC 상징과 비교하여 얼마나 효과적으로 이해되는지 검증하고자 합니다.
          </p>
          
          <h2>연구 절차</h2>
          <ul>
            <li>소요 시간: 약 10-15분</li>
            <li>화면에 제시되는 그림 상징 중 목표 의미를 나타내는 상징을 선택합니다.</li>
            <li>정확도와 반응시간이 자동으로 측정됩니다.</li>
          </ul>
          
          <h2>개인정보 보호</h2>
          <ul>
            <li>수집된 정보는 연구 목적으로만 사용됩니다.</li>
            <li>개인 식별 정보는 암호화되어 저장됩니다.</li>
            <li>연구 종료 후 2년간 보관 후 파기됩니다.</li>
          </ul>
          
          <h2>참여자 권리</h2>
          <ul>
            <li>연구 참여는 자발적이며, 언제든지 철회할 수 있습니다.</li>
            <li>참여 거부나 중도 철회 시 어떠한 불이익도 없습니다.</li>
          </ul>
          
          <h2>연구 책임자</h2>
          <p>대구대학교 재활과학대학원 언어치료학과</p>
          <p>문의: [hankil2002@daegu.ac.kr]</p>
        </div>
        
        <div className="consent-checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>위 내용을 충분히 이해하였으며, 연구 참여에 자발적으로 동의합니다.</span>
          </label>
        </div>
        
        <button 
          className="btn-primary" 
          onClick={handleSubmit}
          disabled={!agreed}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default ConsentForm;
