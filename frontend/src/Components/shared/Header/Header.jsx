import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/slices/authSlice";

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const loggingOut = () => {
    dispatch(logoutUser());
    navigation("/login");
  };

  return (
    <header className="sticky top-0 w-full py-4 bg-cyan-600">
      <div className="flex w-full justify-between items-center px-5">
        <h1>
          <Link
            to={`${isLoggedIn ? `/operations` : `/login`} `}
            className="text-white"
          >
            Home
          </Link>
        </h1>

        <ul className="flex items-center">
          {!isLoggedIn ? (
            <>
              <li className="pr-4">
                <Link to="/signup" className="text-white hover:text-purple-500">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-purple-500">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <p className="text-center text-white invisible sm:visible text-sm md:text-md lg:text-lg px-3 select-none">
                {user.name}
              </p>
              <button
                onClick={() => loggingOut()}
                className="text-white hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
