const supertest = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const request = supertest(app);
const authRoute = "/api/auth";

const {
  invalidCredentials,
  invalidData,
  invalidUserLogin,
  mockedUser,
  userToRegister,
  validCredentials,
  userExists,
} = require("./mocks/authData");

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  await db["users"].create(mockedUser);
});

afterAll(async () => {
  await db.sequelize.sync({ force: true });
  await db.sequelize.close();
});

describe(`POST ${authRoute}/signup`, () => {
  it("should fail when trying to create an user valid that exists, responding a HTTP 400 Bad Request", async () => {
    const response = await request.post(`${authRoute}/signup`).send(userExists);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it("should failt when trying to create an invalid user, responding a HTTP 400 Bad Request", async () => {
    const response = await request
      .post(`${authRoute}/signup`)
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Object),
      })
    );
  });
  it("should success when trying to create an user that doesn't exists, responding a HTTP 201 Created", async () => {
    const response = await request
      .post(`${authRoute}/signup`)
      .send(userToRegister);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });
});

describe(`POST ${authRoute}/login`, () => {
  it("should fail if the credentials aren't correct, responding a HTTP 404 Not Found", async () => {
    const response = await request
      .post(`${authRoute}/login`)
      .send(invalidUserLogin);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("User does not exist");
  });

  it("should fail if the credentials aren't provided, responding a HTTP 400 Not Found", async () => {
    const response = await request
      .post(`${authRoute}/login`)
      .send(invalidCredentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid Credentials");
  });

  it("should success when trying to login with an user that exists, responding a HTTP 200 OK", async () => {
    const response = await request
      .post(`${authRoute}/login`)
      .send(validCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
