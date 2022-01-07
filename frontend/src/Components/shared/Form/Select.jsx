const FormSelect = ({ label, options, name, register, ...rest }) => {
  return (
    <div className="flex items-center w-full py-4">
      <label
        htmlFor={`${label}`}
        className="text-lg font-bold pr-5 flex-grow-0 flex-shrink-0 basis-28 select-none"
      >
        {label}
      </label>
      <select
        className="border rounded-lg w-full px-5 py-1"
        {...register(name)}
        {...rest}
      >
        <option value="">SELECT ONE</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
