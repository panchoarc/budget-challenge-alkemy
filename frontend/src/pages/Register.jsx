/**Importing Hooks */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

/**Importing Components */
import { Link } from "react-router-dom";
import { Alert } from "../Components/shared/Alert";
import {
  FormContainer,
  FormError,
  FormInput,
  FormTitle,
} from "../Components/shared/Form";

/**Valdations Libraries */
import { yupResolver } from "@hookform/resolvers/yup";

/**Importing State from redux */
import { registerUser } from "../store/slices/authSlice";
import { registerSchema } from "../validations/Schemas/UserSchemas";

const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  /**Redux State */
  const { status } = useSelector((state) => state.alert);

  /**Submission Forms */
  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <>
      {status && <Alert />}

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title={"Register a new account"} />

        {errors?.name?.message && <FormError message={errors?.name?.message} />}
        <FormInput
          name={"name"}
          type={"text"}
          label={"Name"}
          register={register}
          placeholder="Full Name"
        />
        {errors?.email?.message && (
          <FormError message={errors?.email?.message} />
        )}
        <FormInput
          name={"email"}
          type={"email"}
          label={"Email"}
          register={register}
          placeholder="example@example.com"
        />

        {errors?.password?.message && (
          <FormError message={errors?.password?.message} />
        )}
        <FormInput
          name={"password"}
          type={"password"}
          label={"Password"}
          register={register}
        />

        <button
          type="submit"
          className="bg-blue-400 text-white p-2 rounded-lg w-full my-6 hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-800 hover:text-blue-900">
            Inicia Sesión
          </Link>
        </p>
      </FormContainer>
    </>
  );
};

export default Register;
