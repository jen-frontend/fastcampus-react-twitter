import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdLogout, MdLogin } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function MenuList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          Profile
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button type="button" onClick={() => navigate("/")}>
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
