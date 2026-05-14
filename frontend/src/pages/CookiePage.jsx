import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function CookiePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToBody = async () => {
      try {
        const res = await fetch(`${BACKEND_API_BASE_URL}/jwt/exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("인증 실패");

        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/");
      } catch {
        alert("소셜 로그인 실패");
        navigate("/login");
      }
    };

    cookieToBody();
  }, [navigate]);

  return (
    <div className="page">
      <div className="card loading-box">
        <div className="spinner"></div>
        <h1 className="title">로그인 처리 중</h1>
        <p className="subtitle">
          소셜 로그인 정보를 확인하고 있습니다. 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

export default CookiePage;