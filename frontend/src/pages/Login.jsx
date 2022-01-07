/**Importing Hooks */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

/**Importing Components */
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../Components/shared/Alert";
import {
  FormContainer,
  FormError,
  FormInput,
  FormTitle,
} from "../Components/shared/Form";

/**Importing State and Schema from redux */
import { loginUser } from "../store/slices/authSlice";
import { loginSchema } from "../validations/Schemas/UserSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { status } = useSelector((state) => state.alert);

  const onSubmit = (data, e) => {
    e.preventDefault();

    dispatch(loginUser(data))
      .then(() => {
        navigate("/operations");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {status && <Alert />}

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title={"Login"} />

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
          Login
        </button>

        <p className="text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="text-blue-800 hover:text-blue-900">
            Registrate
          </Link>
        </p>
      </FormContainer>
    </>
  );
};

export default Login;
