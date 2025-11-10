import React, { useState } from 'react';
import './DemographicForm.css';

function DemographicForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // phone_last4 → phone으로 변경
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
    
    // 전화번호 자동 포맷팅
    if (name === 'phone') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '');
      
      // 8자리까지만 허용
      if (numbers.length <= 8) {
        setFormData(prev => ({
          ...prev,
          [name]: numbers
        }));
      }
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 전화번호 표시 형식 (010-XXXX-XXXX)
  const formatPhone = (numbers) => {
    if (!numbers) return '010-';
    if (numbers.length <= 4) {
      return `010-${numbers}`;
    }
    return `010-${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.phone || !formData.age || !formData.gender || !formData.education || !formData.vision) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 전화번호 유효성 검사 (8자리)
    if (formData.phone.length !== 8) {
      setError('전화번호 8자리를 모두 입력해주세요.');
      return;
    }

    const age = parseInt(formData.age);
    if (age < 19 || age > 59) {
      setError('연령은 19세~59세 사이여야 합니다.');
      return;
    }

    // AAC 경험 체크
    if (formData.has_aac_experience || formData.has_aac_education) {
      alert('죄송합니다. AAC 기기 사용 경험이나 교육 경험이 있으신 분은 참여하실 수 없습니다.');
      return;
    }

    // 완전한 전화번호로 저장
    const fullPhone = `010${formData.phone}`;
    
    onComplete({
      ...formData,
      phone_last4: formData.phone.slice(-4), // 뒷 4자리도 저장
      phone: fullPhone // 전체 번호 저장
    });
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
            <label htmlFor="phone">연락처 *</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">010-</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="12345678"
                maxLength="8"
                pattern="[0-9]{8}"
                required
                className="phone-input"
              />
            </div>
            <small>하이픈(-) 없이 8자리 숫자만 입력 (예: 12345678 → 010-1234-5678)</small>
            {formData.phone && (
              <div className="phone-preview">
                입력 결과: <strong>{formatPhone(formData.phone)}</strong>
              </div>
            )}
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
              max="59"
              placeholder="예: 25"
              required
            />
            <small>만 19세~59세</small>
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
            <label htmlFor="education">최종 학력 *</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">선택해주세요</option>
              <option value="고등학교 졸업 이하">고등학교 졸업 혹은 그 이하</option>
              <option value="전문대학 졸업">전문대학 졸업</option>
              <option value="대학교 졸업">대학교 졸업</option>
              <option value="대학원 졸업/수료">대학원 졸업/수료</option>
            </select>
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