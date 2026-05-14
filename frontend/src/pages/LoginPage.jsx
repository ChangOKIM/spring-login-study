import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (username === "" || password === "") {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("로그인 실패");

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/");
    } catch {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">로그인</h1>
        <p className="subtitle">계정으로 로그인하고 서비스를 이용해보세요.</p>

        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="message-error">{error}</p>}

          <button className="primary-button" type="submit">
            계속
          </button>
        </form>

        <div className="divider">또는</div>

        <div className="form">
          <button
            className="google-button"
            onClick={() => handleSocialLogin("google")}
          >
            Google로 계속하기
          </button>

          <button
            className="naver-button"
            onClick={() => handleSocialLogin("naver")}
          >
            Naver로 계속하기
          </button>
        </div>

        <div className="link-row">
          아직 계정이 없으신가요? <Link to="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;