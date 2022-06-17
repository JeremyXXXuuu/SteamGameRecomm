import { FaSignInAlt, FaSignOutAlt, FaUser, FaGamepad } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <ul>
          <li>
            <Link to="/">
              <FaGamepad />
              homepage
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className='logo'>
        <ul>
        <li>
          <Link to='/userrecomm'>
          <button className='btn'>
               recommend for you
            </button>
          </Link>
        </li>
        </ul>

      </div> */}
      {/* {user ? <h3>{user.name}'s game recommendation</h3> : <></>} */}

      <ul>
        {user ? (
          <>
            <li>
              <h4>{user.name}</h4>
            </li>
            <li>
              <Link to="/userrecomm">
                <button className="btn">recommend</button>
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
