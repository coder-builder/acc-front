import React, { useState } from 'react';
import './PreferenceForm.css';

// 비교할 샘플 단어
const COMPARISON_WORD = "배고파요";

function PreferenceForm({ onComplete }) {
  const [formData, setFormData] = useState({
    easier_to_understand: '',
    preference: '',
    reason: ''
  });

  const [error, setError] = useState('');

  const handleImageSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.easier_to_understand || !formData.preference) {
      setError('모든 필수 항목을 선택해주세요.');
      return;
    }

    onComplete(formData);
  };

  return (
    <div className="preference-container">
      <div className="preference-content">
        <h1>선호도 조사</h1>
        <p className="subtitle">
          두 가지 유형의 AAC 상징을 비교해주세요.<br/>
          아래는 "{COMPARISON_WORD}"을(를) 나타내는 상징입니다.
        </p>

        <form onSubmit={handleSubmit}>
          {/* 질문 1: 이해하기 쉬운 상징 */}
          <div className="form-group">
            <label>어느 상징이 더 이해하기 쉬웠나요? *</label>
            <div className="image-comparison">
              <div 
                className={`comparison-option ${formData.easier_to_understand === 'ai' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('easier_to_understand', 'ai')}
              >
                <div className="image-wrapper">
                  <img
                    src={`/images/ai/${COMPARISON_WORD}.png`}
                    alt="AI 생성 상징"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    AI 상징
                  </div>
                </div>
                <div className="option-label">
                  <input
                    type="radio"
                    name="easier_to_understand"
                    value="ai"
                    checked={formData.easier_to_understand === 'ai'}
                    onChange={handleChange}
                    required
                  />
                  <span>AI 생성 상징</span>
                </div>
              </div>

              <div 
                className={`comparison-option ${formData.easier_to_understand === 'kaac' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('easier_to_understand', 'kaac')}
              >
                <div className="image-wrapper">
                  <img
                    src={`/images/kaac/${COMPARISON_WORD}.png`}
                    alt="KAAC 상징"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    KAAC 상징
                  </div>
                </div>
                <div className="option-label">
                  <input
                    type="radio"
                    name="easier_to_understand"
                    value="kaac"
                    checked={formData.easier_to_understand === 'kaac'}
                    onChange={handleChange}
                    required
                  />
                  <span>KAAC 상징</span>
                </div>
              </div>

              <div 
                className={`comparison-option text-only ${formData.easier_to_understand === 'similar' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('easier_to_understand', 'similar')}
              >
                <div className="option-label">
                  <input
                    type="radio"
                    name="easier_to_understand"
                    value="similar"
                    checked={formData.easier_to_understand === 'similar'}
                    onChange={handleChange}
                    required
                  />
                  <span>비슷함</span>
                </div>
              </div>
            </div>
          </div>

          {/* 질문 2: 선호하는 상징 */}
          <div className="form-group">
            <label>어느 상징을 더 선호하시나요? *</label>
            <div className="image-comparison">
              <div 
                className={`comparison-option ${formData.preference === 'ai' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('preference', 'ai')}
              >
                <div className="image-wrapper">
                  <img
                    src={`/images/ai/${COMPARISON_WORD}.png`}
                    alt="AI 생성 상징"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    AI 상징
                  </div>
                </div>
                <div className="option-label">
                  <input
                    type="radio"
                    name="preference"
                    value="ai"
                    checked={formData.preference === 'ai'}
                    onChange={handleChange}
                    required
                  />
                  <span>AI 생성 상징</span>
                </div>
              </div>

              <div 
                className={`comparison-option ${formData.preference === 'kaac' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('preference', 'kaac')}
              >
                <div className="image-wrapper">
                  <img
                    src={`/images/kaac/${COMPARISON_WORD}.png`}
                    alt="KAAC 상징"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    KAAC 상징
                  </div>
                </div>
                <div className="option-label">
                  <input
                    type="radio"
                    name="preference"
                    value="kaac"
                    checked={formData.preference === 'kaac'}
                    onChange={handleChange}
                    required
                  />
                  <span>KAAC 상징</span>
                </div>
              </div>

              <div 
                className={`comparison-option text-only ${formData.preference === 'similar' ? 'selected' : ''}`}
                onClick={() => handleImageSelect('preference', 'similar')}
              >
                <div className="option-label">
                  <input
                    type="radio"
                    name="preference"
                    value="similar"
                    checked={formData.preference === 'similar'}
                    onChange={handleChange}
                    required
                  />
                  <span>비슷함</span>
                </div>
              </div>
            </div>
          </div>

          {/* 질문 3: 이유 */}
          <div className="form-group">
            <label htmlFor="reason">선택 이유 (선택사항)</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              placeholder="선호하는 상징을 선택한 이유를 자유롭게 작성해주세요."
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreferenceForm;