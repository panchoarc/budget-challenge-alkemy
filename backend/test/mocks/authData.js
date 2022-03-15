const mockedUser = {
  name: "test",
  email: "example@example.com",
  password: "$2a$10$N73CX3rIUvy41zt2Wki.kuqw/xrSTHTELw2pxls5KebT94hMV6in2",
};

/**Register Data */
const invalidData = {
  name: "test",
  email: "",
  password: "12345678",
};

const userExists = {
  name: "test",
  email: "example@example.com",
  password: "12345678",
};
const userToRegister = {
  name: "test",
  email: "example99@example.com",
  password: "12345678",
};

/**
 * Login data
 */

const invalidUserLogin = {
  email: "example1@example.com",
  password: "12345678",
};

const invalidCredentials = {
  email: "example@example.com",
  password: "123456",
};

const validCredentials = {
  email: "example@example.com",
  password: "12345678",
};

module.exports = {
  userExists,
  mockedUser,
  invalidData,
  userToRegister,
  invalidUserLogin,
  invalidCredentials,
  validCredentials,
};
