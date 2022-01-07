import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center py-auto h-100 items-center">
      <img
        className=""
        src={`${require("../images/notfound.jpg")}`}
        alt="404 Not Found"
      />
      <Link
        className="text-white bg-blue-700 rounded-full px-4 py-2"
        to={"/login"}
      >
        Ir a Home
      </Link>
    </div>
  );
};

export default NotFound;
