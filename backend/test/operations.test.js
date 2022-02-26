require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const request = supertest(app);
const operationsRoute = "/api/operations";

const token = `${process.env.SERVER_JWT_TOKEN_TEST}`;

afterAll(async () => {
  await db.sequelize.close();
});

const validOperation = {
  concept: "test",
  description: "test",
  amount: 1,
  type: "INCOME",
  date: "2020-01-01",
};

const invalidOperation = {
  name: "test",
  description: "test",
  amount: "asd",
  type: "INCOME",
};

const updatingData = {
  concept: "updated",
  amount: 5000,
  date: "2022-02-26",
};

describe(`POST ${operationsRoute}`, () => {
  it("should return 201 created when operations is created Successfully", async () => {
    const response = await request
      .post(`${operationsRoute}`)
      .set("access-token", token)
      .send(validOperation);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Operation created successfully");
    expect(response.body.operation).toHaveProperty("id");
  });

  it("should return 400 Bad Request when operations doesn't have one or more data to send", async () => {
    const response = await request
      .post(`${operationsRoute}`)
      .set("access-token", token)
      .send(invalidOperation);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Object),
      })
    );
  });
});

describe(`GET ${operationsRoute}`, () => {
  it("should return 401 when authentication doesn't set in headers", async () => {
    const response = await request.get(`${operationsRoute}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not Provided");
  });

  it("should return 200 when are 0 or more operations for the user", async () => {
    const response = await request
      .get(`${operationsRoute}`)
      .set("access-token", token);

    expect(response.status).toBe(200);
    expect(response.body.operations.length).toBeGreaterThanOrEqual(0);
  });
});

describe(`GET ${operationsRoute}/:id`, () => {
  it("should return 401 when authentication doesn't set in headers", async () => {
    const response = await request.get(`${operationsRoute}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not Provided");
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/1`)
      .set("access-token", token);

    expect(response.status).toBe(200);
    expect(response.body.operation).toHaveProperty("id");
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/2`)
      .set("access-token", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operation parameter is incorrect format and the user is the correct user", async () => {
    const response = await request
      .get(`${operationsRoute}/ñ`)
      .set("access-token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem retrieving the data"
    );
  });
});

describe(`PUT ${operationsRoute}/:id`, () => {
  it("should return 401 when authentication doesn't set in headers", async () => {
    const response = await request.get(`${operationsRoute}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not Provided");
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .put(`${operationsRoute}/1`)
      .set("access-token", token)
      .send(updatingData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Operation updated successfully");
    expect(response.body).toHaveProperty("operation");
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .put(`${operationsRoute}/2`)
      .set("access-token", token)
      .send(updatingData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/ñ`)
      .set("access-token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem deleting the operation"
    );
  });
});

describe(`DELETE ${operationsRoute}/:id`, () => {
  it("should return 401 when authentication doesn't set in headers", async () => {
    const response = await request.get(`${operationsRoute}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not Provided");
  });

  it("should return 200 when the operations exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/1`)
      .set("access-token", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Operation deleted");
  });

  it("should return 404 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/2`)
      .set("access-token", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Operation not found");
  });

  it("should return 500 when the operations doesn't exists and the user is the correct user", async () => {
    const response = await request
      .delete(`${operationsRoute}/ñ`)
      .set("access-token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "There was a problem deleting the operation"
    );
  });
});
