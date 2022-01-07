/**Importing Hooks */

/**Importing State and Validations */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
/**Importing Components */
import { Alert } from "../Components/shared/Alert";
import {
  FormContainer,
  FormError,
  FormInput,
  FormTitle,
} from "../Components/shared/Form";
import { getOperation, updateOperation } from "../store/slices/operationSlice";
import { editOperationSchema } from "../validations/Schemas/OperationsSchema";

const EditOperation = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();
  const { selectedOperation } = useSelector((state) => state.operations);
  const { status } = useSelector((state) => state.alert);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(editOperationSchema),
  });

  const [operation, setOperation] = useState();

  useEffect(() => {
    if (selectedOperation === null) {
      dispatch(getOperation(params.id));
    } else {
      setOperation(...selectedOperation);
    }
  }, [selectedOperation, params.id, dispatch]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.id = params.id;
    dispatch(updateOperation(data))
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
        <FormTitle title={"Edit a Operation"} />

        {errors?.concept?.message && (
          <FormError message={errors?.concept?.message} />
        )}
        <FormInput
          defaultValue={operation?.concept}
          name={"concept"}
          type={"text"}
          label={"Concept"}
          register={register}
        />

        {errors?.amount?.message && (
          <FormError message={errors?.amount?.message} />
        )}
        <FormInput
          defaultValue={operation?.amount}
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

        <div className="flex w-full justify-end px-5">
          <button
            type="submit"
            className="bg-blue-400 text-white py-2 px-4 mx-8 rounded-lg my-6 hover:bg-blue-700"
          >
            Edit
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

export default EditOperation;
