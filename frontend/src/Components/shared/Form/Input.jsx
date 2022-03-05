const FormInput = ({ type, name, label, register, ...props }) => {
  return (
    <div className="flex items-center w-full py-4">
      <label
        htmlFor={`${name}`}
        className="text-lg font-bold pr-5 flex-grow-0 flex-shrink-0 basis-28 select-none"
      >
        {label}
      </label>
      <input
        id={`${name}`}
        {...props}
        {...register(`${name}`)}
        type={`${type}`}
        name={`${name}`}
        className="border rounded-lg w-full px-5 py-1"
      />
    </div>
  );
};

export default FormInput;
