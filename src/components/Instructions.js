import React from 'react';
import './Instructions.css';

function Instructions({ onComplete }) {
  return (
    <div className="instructions-container">
      <div className="instructions-content">
        <h1>실험 안내</h1>
        
        <div className="instruction-section">
          <h2>📋 실험 방법</h2>
          <ol>
            <li>화면 상단에 <strong>목표 단어</strong>가 제시됩니다.</li>
            <li>아래에 <strong>16개의 그림</strong>이 4×4 격자로 배열됩니다.</li>
            <li>목표 단어의 의미를 가장 잘 나타내는 그림을 <strong>클릭</strong>해주세요.</li>
            <li>가능한 한 <strong>빠르고 정확하게</strong> 선택해주시기 바랍니다.</li>
          </ol>
        </div>

        <div className="instruction-section">
          <h2>⏱️ 실험 구성</h2>
          <ul>
            <li>연습 시행: 2회 (본 실험 전 연습)</li>
            <li>본 실험: 14회</li>
            <li>예상 소요 시간: 약 15-20분</li>
          </ul>
        </div>

        <div className="instruction-section">
          <h2>💡 유의사항</h2>
          <ul>
            <li>각 문제마다 반응시간이 측정되므로, 너무 오래 고민하지 마세요.</li>
            <li>직관적으로 가장 적합하다고 생각되는 그림을 선택하시면 됩니다.</li>
            <li>실험 중에는 뒤로 가기나 새로고침을 하지 말아 주세요.</li>
            <li>조용한 환경에서 집중하여 참여해주세요.</li>
          </ul>
        </div>

        <div className="instruction-example">
          <h2>📝 예시</h2>
          <div className="example-box">
            <p className="example-target">목표 단어: <strong>"가요"</strong></p>
            <p className="example-task">→ "가요(가다)"을 나타내는 그림을 선택하세요</p>
          </div>
        </div>

        <div className="ready-section">
          <p>준비되셨나요?</p>
          <p className="ready-subtitle">먼저 2회의 연습 시행을 진행하겠습니다.</p>
          <button className="btn-primary btn-large" onClick={onComplete}>
            연습 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
