require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const request = supertest(app);
const operationsRoute = "/api/operations";
const {
  invalidOperation,
  updatingData,
  validOperation,
} = require("./mocks/operationData");

const { mockedUser } = require("./mocks/authData");
const token = `Bearer ${process.env.SERVER_JWT_TOKEN_TEST}`;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  await db["users"].create(mockedUser);
});

afterAll(async () => {
  await db.sequelize.sync({ force: true });
  await db.sequelize.close();
});

describe(`POST ${operationsRoute}`, () => {
  it("should return 400 Bad Request when operations doesn't have one or more data to send", async () => {
    const response = await request
      .post(`${operationsRoute}`)
      .set("Authorization", token)
      .send(invalidOperation);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Object),
      })
    );
  });

  it("should return 201 created when operations is created Successfully", async () => {
    const response = await request
      .post(`${operationsRoute}`)
      .set("Authorization", token)
      .send(validOperation);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Operation created successfully");
    expect(response.body.operation).toHaveProperty("id");
  });
});

describe(`GET ${operationsRoute}/:id`, () => {
  it("should return 500 when authentication doesn't set in headers", async () => {
    const response = await request.get(`${operationsRoute}`);

    expect(response.status).toBe(500);
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/1`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/2`)
      .set("Authorization", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operation parameter is incorrect format and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/ñ`)
      .set("Authorization", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem retrieving the data"
    );
  });
});

describe(`PUT ${operationsRoute}/:id`, () => {
  it("should return 404 when authentication doesn't set in headers", async () => {
    const response = await request.put(`${operationsRoute}`);

    expect(response.status).toBe(404);
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .put(`${operationsRoute}/1`)
      .set("Authorization", token)
      .send(updatingData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Operation updated successfully");
    expect(response.body).toHaveProperty("operation");
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .put(`${operationsRoute}/2`)
      .set("Authorization", token)
      .send(updatingData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/ñ`)
      .set("Authorization", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem deleting the operation"
    );
  });
});

describe(`DELETE ${operationsRoute}/:id`, () => {
  it("should return 404 when authentication doesn't set in headers", async () => {
    const response = await request.delete(`${operationsRoute}`);

    expect(response.status).toBe(404);
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/1`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Operation deleted");
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/2`)
      .set("Authorization", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/ñ`)
      .set("Authorization", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem deleting the operation"
    );
  });
});
