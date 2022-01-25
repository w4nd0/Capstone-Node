import { getConnection, getRepository } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";
import User from "../../entities/User";
import CreateUserService from "../../services/User/CreateUser.service";

describe("Testing the user routes with success", () => {
  beforeAll(async () => {
    await connection();
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });
    await userRepository.delete({ id: admId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let token = "";
  let userId = "";

  const userData = {
    name: "teste",
    email: "teste@teste.com",
    password: "12345678",
  };

  const admData = {
    name: "adm",
    email: "adm@teste.com",
    password: "12345678",
  };

  let admId = "";

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send(userData);

    userId = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(201);
  });

  it("Should be able to login with the created user", async () => {
    const response = await request(app).post("/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.body).toHaveProperty("token");

    token = response.body.token;

    expect(response.status).toBe(200);
  });

  it("Should be able to get the user profile informations if authenticated", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
  });

  it("Should be able to update the user informations if authenticated", async () => {
    const updateUserData = {
      name: "teste update",
      email: "testeUpdate@teste.com",
    };

    const response = await request(app)
      .patch("/users/profile")
      .send(updateUserData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateUserData.name);
    expect(response.body.email).toBe(updateUserData.email);
  });

  it("Should be able to disable the user if authenticated", async () => {
    const response = await request(app)
      .post("/users/disable")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
    expect(response.body.isActive).toBe(false);
  });

  it("Should be able to see user list if admin", async () => {
    const createUserService = new CreateUserService();
    const adm = await createUserService.execute({ ...admData });

    const userRepository = getRepository(User);
    await userRepository.update({ id: adm.id }, { isAdm: true });
    admId = adm.id;

    const loginResponse = await request(app).post("/login").send({
      email: admData.email,
      password: admData.password,
    });

    const response = await request(app)
      .get("/users")
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    expect(response.status).toBe(200);
  });
});

describe("Testing the user routes with failure", () => {
  beforeAll(async () => {
    await connection();
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let userId = "";

  const userData = {
    name: "teste",
    email: "teste@teste.com",
    password: "12345678",
  };

  it("Should not be able to create a new user if missing fields", async () => {
    const response = await request(app).post("/users");

    expect(response.status).toBe(400);
  });

  it("Should not be able to create a new user if email already registered", async () => {
    const userResponse = await request(app).post("/users").send(userData);
    userId = userResponse.body.id;

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(409);
  });

  it("Should not be able to login if email/password is wrong", async () => {
    const response = await request(app).post("/login").send({
      email: "testeFail@teste.com",
      password: "12345678",
    });

    expect(response.status).toBe(401);
  });

  it("Should not be able to get the user profile informations if not authenticated", async () => {
    const response = await request(app).get("/users/profile");

    expect(response.status).toBe(401);
  });

  it("Should not be able to update the user informations if not authenticated", async () => {
    const updateUserData = {
      name: "teste update",
      email: "testeUpdate@teste.com",
    };

    const response = await request(app)
      .patch("/users/profile")
      .send(updateUserData);

    expect(response.status).toBe(401);
  });

  it("Should not be able to disable the user if not authenticated", async () => {
    const response = await request(app).post("/users/disable");

    expect(response.status).toBe(401);
  });

  it("Should not be able to see user list if not admin", async () => {
    const loginResponse = await request(app).post("/login").send({
      email: userData.email,
      password: userData.password,
    });

    const response = await request(app)
      .get("/users")
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    expect(response.status).toBe(401);
  });
});
