/**Importing Hooks */
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/**Importing Components */
import Alert from "../Components/shared/Alert/Alert";
import {
  FormContainer,
  FormError,
  FormInput,
  FormSelect,
  FormTitle,
} from "../Components/shared/Form";
import DatePicker from "react-datepicker";

/**Importing state and validations */
import { createOperation } from "../store/slices/operationSlice";
import { operationCreateSchema } from "../validations/Schemas/OperationsSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const AddOperation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(operationCreateSchema),
  });

  const { status } = useSelector((state) => state.alert);

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(createOperation(data))
      .then(() => {
        navigation("/operations");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {status && <Alert />}

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title={"Create a Operation"}>Create a Operation</FormTitle>

        {errors?.concept?.message && (
          <FormError message={errors?.concept?.message} />
        )}

        <FormInput
          name={"concept"}
          type={"text"}
          label={"Concept"}
          register={register}
        />
        {errors?.amount?.message && (
          <FormError message={errors?.amount?.message} />
        )}
        <FormInput
          name={"amount"}
          type={"text"}
          label={"Amount"}
          register={register}
        />
        {errors?.date?.message && <FormError message={errors?.date?.message} />}
        <div className="flex items-center w-full py-4">
          <label
            htmlFor="date"
            className="text-lg font-bold pr-5 flex-grow-0 flex-shrink-0 basis-28 select-none"
          >
            Date
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                dateFormat={"dd-MM-yyyy"}
                placeholderText="Select date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="w-full border"
              />
            )}
          />
        </div>

        {errors?.type?.message && <FormError message={errors?.type?.message} />}
        <FormSelect
          name={"type"}
          label={"Type"}
          options={["INCOME", "EXPENSE"]}
          register={register}
        />

        <div className="flex w-full justify-end px-5">
          <button
            type="submit"
            className="bg-blue-400 text-white p-2 mx-8 rounded-lg my-6 hover:bg-blue-700"
          >
            Create
          </button>
          <Link
            to={"/operations"}
            className="bg-gray-400 text-white p-2 rounded-lg my-6 hover:bg-gray-700"
          >
            Cancel
          </Link>
        </div>
      </FormContainer>
    </>
  );
};

export default AddOperation;
