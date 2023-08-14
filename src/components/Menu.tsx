import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdLogout, MdLogin } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";

import { toast } from "react-toastify";

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
        <button type="button" onClick={() => navigate("/search")}>
          <AiOutlineSearch />
          Search
        </button>
        <button type="button" onClick={() => navigate("/notifications")}>
          <IoMdNotificationsOutline />
          Notification
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              await signOut(auth);
              toast.success("로그아웃 되었습니다.");
            }}
          >
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
