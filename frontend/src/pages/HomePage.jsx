import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="page">
      <div className="card wide-card">
        <h1 className="title">Spring React Login</h1>
        <p className="subtitle">
          자체 로그인과 소셜 로그인을 테스트할 수 있는 메인 페이지입니다.
          로그인 후 토큰을 저장하고, 내 정보를 조회할 수 있습니다.
        </p>

        <div className="home-actions">
          <Link to="/login" className="home-link-card">
            <strong>로그인</strong>
            <span>아이디 또는 소셜 계정으로 로그인</span>
          </Link>

          <Link to="/join" className="home-link-card">
            <strong>회원가입</strong>
            <span>새 계정 생성하기</span>
          </Link>

          <Link to="/user" className="home-link-card">
            <strong>내 정보</strong>
            <span>로그인한 유저 정보 확인</span>
          </Link>

          <Link to="/cookie" className="home-link-card">
            <strong>쿠키 처리</strong>
            <span>소셜 로그인 토큰 교환 페이지</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;