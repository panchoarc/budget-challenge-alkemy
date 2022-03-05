import { rest } from "msw";
import dotenv from "dotenv";
dotenv.config();

const userData = [
  {
    id: 1,
    name: "John",
    email: "example20@example.com",
    password: "123456",
  },
];

const registerHandler = [
  rest.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
    (req, res, ctx) => {
      const { email, password } = req.body;

      const user = userData.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        return res(
          ctx.status(201),
          ctx.json({
            message: "User created successfully",
          })
        );
      } else {
        return res(
          ctx.status(400),
          ctx.json({
            message: "User already exists",
          })
        );
      }
    }
  ),
];
export default registerHandler;
