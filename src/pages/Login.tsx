import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/Features/Auth/authApi";
import verifyToken from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/Features/Auth/authSlice";
interface IFromValue {
  id: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFromValue>({
    defaultValues: {
      id: "2031030003",
      password: "student123456",
    },
  });

  const onSubmit = async (fromValue: IFromValue) => {
    const res = await login(fromValue).unwrap();
    if (res.success) {
      const userData = verifyToken(res?.data?.accessToken);
      dispatch(
        setUser({ user: userData?.data, token: res?.data?.accessToken })
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700">
              ID
            </label>
            <input
              id="id"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              {...register("id", { required: "ID is required" })}
            />
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-4">{error?.data?.message}</p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm mt-4">Login successful!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
