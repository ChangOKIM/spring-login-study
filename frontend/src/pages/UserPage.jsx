import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchWithAccess } from "../util/fetchUtil";

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function UserPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("유저 정보 불러오기 실패");

        const data = await res.json();
        setUserInfo(data);
      } catch {
        setError("유저 정보를 불러오지 못했습니다.");
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">내 정보</h1>
        <p className="subtitle">현재 로그인된 계정 정보를 확인합니다.</p>

        {error && <p className="message-error">{error}</p>}

        {!error && !userInfo && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p className="subtitle">유저 정보를 불러오는 중입니다.</p>
          </div>
        )}

        {userInfo && (
          <div className="user-info-list">
            <div className="user-info-item">
              <span>아이디</span>
              <strong>{userInfo.username}</strong>
            </div>

            <div className="user-info-item">
              <span>닉네임</span>
              <strong>{userInfo.nickname}</strong>
            </div>

            <div className="user-info-item">
              <span>이메일</span>
              <strong>{userInfo.email}</strong>
            </div>
          </div>
        )}

        <div className="link-row">
          <Link to="/">메인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}

export default UserPage;