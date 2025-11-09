import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import {
  InfoIcon,
  LoginIcon,
  LogoutIcon,
  StoriesIcon,
  StoryIcon,
} from "./Icons";

const Navbar = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between p-6 w-full 2xl:rounded-b 2xl:max-w-screen-2xl 2xl:mx-auto">
      <StoriesIcon />
      <div>
        {user ? (
          <div className="flex justify-center">
            <span className="max-w-[250px] text-[#fca311] text-l font-bold pb-4 truncate">
              {user?.email}
            </span>
          </div>
        ) : (
          <div className="flex justify-start pb-4">
            <span className="text-[#fca311] text-l font-bold">
              not logged in
            </span>
          </div>
        )}
        <ul className="flex justify-end md:justify-between flex-wrap gap-x-8 gap-y-4 text-white font-bold sm:justify-center sm:gap-x-16 *:text-xl">
          <li>
            <Link to="/stories">
              <StoryIcon />
            </Link>
          </li>

          <li>
            <Link to="/">
              <InfoIcon />
            </Link>
          </li>

          {isLoading ? (
            <li>Loading...</li>
          ) : (
            <li>
              {user ? (
                <button onClick={() => signOut(getAuth())}>
                  <LogoutIcon />
                </button>
              ) : (
                <button onClick={() => navigate("/login")}>
                  <LoginIcon />
                </button>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
