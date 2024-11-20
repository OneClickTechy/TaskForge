import { Link } from "react-router-dom";
import { useGetmeQuery } from "../../app/services/userSlicer";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiCheckCircle } from "react-icons/fi";
import { MdStarBorder } from "react-icons/md";
const Navigation = () => {
  const { data, isError, isLoading } = useGetmeQuery(undefined, {
    skip: false,
  });
  let userProfile;

  if (data && data.username) {
    userProfile = data?.username?.[0].toUpperCase();
  }

  const handleClick = (e) => {
    if (data && !isError) {
      
    }
  };
  return (
    <nav className="flex justify-between items-center p-2">
      <div>
        <RxHamburgerMenu size={32} className="hidden sm:block" />
        <menu>
          <li>
            <Link
              to=""
              className="font-semibold flex flex-nowrap justify-center items-center gap-1"
            >
              <span>
                <FiCheckCircle />
              </span>
              <span className="hidden sm:block">All Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="font-semibold flex justify-center items-center gap-1"
            >
              <span>
                <MdStarBorder />
              </span>
              <span className="hidden sm:block">Favorite</span>
            </Link>
          </li>
        </menu>
      </div>

      {isLoading || isError ? (
        <FaUserCircle size={32} />
      ) : (
        data && (
          <div className="relative">
            <div
              className="relative top-0 right-0 bg-black text-white border border-gray-500 w-8 aspect-square flex justify-center items-center rounded-full font-semibold cursor-pointer"
              onClick={handleClick}
            >
              {userProfile}
            </div>
            <menu className="fixed right-12 top-4 p-4 divide-y-2 divide-gray-500 border-2 rounded-2xl  border-blue-500">
              <li className="cursor-pointer">Profile</li>
              <li className="cursor-pointer">Logout</li>
            </menu>
          </div>
        )
      )}
    </nav>
  );
};

export default Navigation;
