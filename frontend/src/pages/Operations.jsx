import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Operation from "../Components/Operations/Operation";
import Alert from "../Components/shared/Alert/Alert";
import { getLast10Operations } from "../store/slices/operationSlice";

const Operations = () => {
  const dispatch = useDispatch();

  const { operations, totalBudget } = useSelector((state) => state.operations);
  const { status } = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch(getLast10Operations());
  }, [dispatch]);

  return (
    <>
      {status && <Alert />}
      <Link
        className="inline-block px-3 py-1 mt-4 rounded-full leading-tight bg-blue-600 text-white"
        to="create"
      >
        Add Operation
      </Link>

      <h1 className="text-center py-4 font-bold text-4xl">
        Last 10 Operations
      </h1>
      <p className="font-bold text-2xl text-center py-5">
        Total Budget:
        <span
          className={`${totalBudget >= 0 ? "text-green-800" : "text-red-600"}`}
        >
          {" "}
          {totalBudget}
        </span>
      </p>
      <table className="table-fixed mx-auto w-full border-separate">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Concept</th>
            <th>Amount</th>
            <th className="hidden md:table-cell">Date</th>
            <th className="hidden sm:table-cell">Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {operations.length > 0 ? (
            operations.map((operation) => (
              <Operation key={"" + operation.id} operation={operation} />
            ))
          ) : (
            <tr className="bg-red-400 text-center">
              <td colSpan={5}>You have not registered any operation yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Operations;
