const supertest = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const request = supertest(app);
const authRoute = "/api/auth";

const validData = {
  name: "test",
  email: "example@example.com",
  password: "12345678",
};

const invalidData = {
  name: "test",
  email: "",
  password: "12345678",
};

const invalidUserLogin = {
  email: "example1@example.com",
  password: "12345678",
};

const invalidCredentials = {
  email: "example@example.com",
  password: "123456",
};

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

describe(`POST ${authRoute}/signup`, () => {
  it("should success when trying to create an user that doesn't exists, responding a HTTP 201 Created", async () => {
    const response = await request.post(`${authRoute}/signup`).send(validData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should fail when trying to create an user valid that exists, responding a HTTP 400 Bad Request", async () => {
    const response = await request.post(`${authRoute}/signup`).send(validData);

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
});

describe(`POST ${authRoute}/login`, () => {
  it("should success when trying to login with an user that exists, responding a HTTP 200 OK", async () => {
    const response = await request.post(`${authRoute}/login`).send(validData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

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
});
