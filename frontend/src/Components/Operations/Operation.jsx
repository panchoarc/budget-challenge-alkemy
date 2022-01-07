import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOperation } from "../../store/slices/operationSlice";

const Operation = ({ operation }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { concept, amount, date, type, id } = operation;

  return (
    <tr className="bg-blue-50">
      <td>
        <p>{concept}</p>
      </td>
      <td className="flex items-center">
        {type === "INCOME" ? (
          <>
            <ArrowCircleUpIcon className=" sm:hidden text-green-600 w-6 h-6" />
            <p className="pl-3">{amount}</p>
          </>
        ) : (
          <>
            <ArrowCircleDownIcon className="sm:hidden text-red-500 w-6 h-6" />
            <p className="pl-3">{amount}</p>
          </>
        )}
      </td>
      <td className=" text-center hidden md:table-cell">
        <p>{format(parseISO(date), "dd-MM-yyyy")}</p>
      </td>
      <td className="text-center hidden sm:table-cell">
        {type === "INCOME" ? (
          <span className="relative inline-block px-3 py-1 font-semibold text-white bg-green-500 rounded-full leading-tight">
            {type}
          </span>
        ) : (
          <span className="relative inline-block px-3 py-1 font-semibold text-white bg-red-500 rounded-full leading-tight">
            {type}
          </span>
        )}
      </td>

      <td className="flex justify-center">
        <button
          onClick={() => navigation(`/operations/edit/${id}`)}
          className="mr-4 px-1 py-2"
        >
          <PencilAltIcon className="text-orange-400 w-5 h-5" />
        </button>
        <button
          onClick={() => dispatch(deleteOperation(id))}
          className="mr-4 rounded-lg"
        >
          <TrashIcon className="text-red-500 w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default Operation;
