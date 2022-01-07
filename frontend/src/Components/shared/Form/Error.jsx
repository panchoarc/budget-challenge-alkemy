import { ExclamationIcon } from "@heroicons/react/outline";

const FormError = ({ message }) => {
  return (
    <div className="inline-flex w-full align-middle px-4 py-2 leading-tight bg-amber-500 text-white rounded-lg ">
      <ExclamationIcon className="w-5 h-5" />
      <p className="pl-3 font-semibold">{message}</p>
    </div>
  );
};

export default FormError;
