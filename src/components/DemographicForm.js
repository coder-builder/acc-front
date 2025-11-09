import React, { useState } from 'react';
import './DemographicForm.css';

function DemographicForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone_last4: '',
    age: '',
    gender: '',
    education: '',
    vision: '',
    has_aac_experience: false,
    has_aac_education: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.phone_last4 || !formData.age || !formData.gender || !formData.vision) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 연락처 유효성 검사
    if (formData.phone_last4.length !== 4 || !/^\d{4}$/.test(formData.phone_last4)) {
      setError('연락처 뒷자리 4자리를 정확히 입력해주세요.');
      return;
    }

    const age = parseInt(formData.age);
    if (age < 19 || age > 39) {
      setError('연령은 19세~39세 사이여야 합니다.');
      return;
    }

    // AAC 경험 체크
    if (formData.has_aac_experience || formData.has_aac_education) {
      alert('죄송합니다. AAC 기기 사용 경험이나 교육 경험이 있으신 분은 참여하실 수 없습니다.');
      return;
    }

    // ✅ DB 저장 없이 데이터만 반환!
    onComplete(formData);
  };

  return (
    <div className="demographic-container">
      <div className="demographic-content">
        <h1>기본 정보 입력</h1>
        <p className="subtitle">연구 참여를 위해 몇 가지 정보를 입력해주세요.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_last4">연락처 뒷자리 *</label>
            <input
              type="text"
              id="phone_last4"
              name="phone_last4"
              value={formData.phone_last4}
              onChange={handleChange}
              maxLength="4"
              placeholder="예: 1234"
              pattern="\d{4}"
              required
            />
            <small>휴대폰 번호 뒷자리 4자리 (예: 010-1234-5678 → 5678)</small>
          </div>

          <div className="form-group">
            <label htmlFor="age">연령 *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="19"
              max="39"
              placeholder="예: 25"
              required
            />
            <small>만 19세~39세</small>
          </div>

          <div className="form-group">
            <label>성별 *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  required
                />
                여성
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>시력 *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="vision"
                  value="normal"
                  checked={formData.vision === 'normal'}
                  onChange={handleChange}
                  required
                />
                정상
              </label>
              <label>
                <input
                  type="radio"
                  name="vision"
                  value="corrected"
                  checked={formData.vision === 'corrected'}
                  onChange={handleChange}
                  required
                />
                교정 (안경/렌즈)
              </label>
            </div>
          </div>

          <div className="form-group">
              <label htmlFor="education">최종 학력</label>
              <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
              >
                  <option value="">선택</option>
                  <option value="고등학교 졸업 이하">고등학교 졸업 혹은 그 이하</option>
                  <option value="전문대학 졸업">전문대학 졸업</option>
                  <option value="대학교 졸업">대학교 졸업</option>
                  <option value="대학원 졸업/수료">대학원 졸업/수료</option>
              </select>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="has_aac_experience"
                checked={formData.has_aac_experience}
                onChange={handleChange}
              />
              AAC 기기를 직접 사용한 경험이 있습니다
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="has_aac_education"
                checked={formData.has_aac_education}
                onChange={handleChange}
              />
              AAC 관련 교육을 받았거나 연구에 참여한 경험이 있습니다
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}

export default DemographicForm;