import { rest } from "msw";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.REACT_APP_TOKEN_TEST;
const userData = [
  {
    id: 1,
    name: "John",
    email: "example20@example.com",
    password: "123456",
  },
];
const loginHandler = [
  rest.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
    (req, res, ctx) => {
      const { email, password } = req.body;

      const exists = userData.find((user) => user.email === email);

      if (exists) {
        const user = userData.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          return res(
            localStorage.setItem("token", token),
            ctx.status(200),
            ctx.json({
              token: token,
            })
          );
        } else {
          return res(
            ctx.status(400),
            ctx.json({
              message: "Invalid Credentials",
            })
          );
        }
      } else {
        return res(
          ctx.status(404),
          ctx.json({
            message: "User does not exist",
          })
        );
      }
    }
  ),
];

export default loginHandler;
