import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../../../store/slices/alertSlice";

const Alert = () => {
  const { message, status } = useSelector((state) => state.alert);
  const [showHeader, setShowHeader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setShowHeader(false);
      dispatch(clearMessage());
    }, 2000);

    return () => {
      setShowHeader(false);
    };
  }, [dispatch]);

  return (
    <>
      {showHeader && (
        <div
          className={`fixed right-0 flex justify-center w-52  ml-auto mr-4 p-2 my-4 rounded-lg animate-pulse ${
            status === "error" ? `bg-red-500` : `bg-green-500`
          }`}
          role="alert"
        >
          <p className="ml-3 text-md font-medium text-white">{message}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
