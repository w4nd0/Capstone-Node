import { getConnection, getRepository } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";
import User from "../../entities/User";
import CreateUserService from "../../services/User/CreateUser.service";
import Product from "../../entities/Product";

describe("Testing the user routes with success", () => {
  beforeAll(async () => {
    await connection();
    const user = await new CreateUserService().execute({ ...admData });
    const userRepository = getRepository(User);

    await userRepository.update({ id: user.id }, { isAdm: true });
    const adm = await userRepository.findOneOrFail({ id: user.id });

    const login = await request(app).post("/login").send({
      email: admData.email,
      password: admData.password,
    });

    userId = adm.id;
    token = login.body.token;
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  const admData = {
    name: "adm",
    email: "adm@teste.com",
    password: "12345678",
  };

  const productData = {
    name: "teste",
    description: "description teste",
    price: 50,
  };

  let token = "";
  let productId = "";
  let userId = "";

  it("Should be able to create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send(productData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    productId = response.body.id;

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(201);
  });

  it("Should be able to get the product informations", async () => {
    const response = await request(app).get(`/products/${productId}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
  });

  it("Should be able to update the product informations if is adm", async () => {
    const updateProductData = {
      name: "teste update",
      description: "description update",
      price: 25,
    };

    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(updateProductData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateProductData.name);
    expect(response.body.description).toBe(updateProductData.description);
    expect(response.body.price).toBe(updateProductData.price);
  });

  it("Should be able to see product list", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
  });

  it("Should be able to delete the product informations if is adm", async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });
});

describe("Testing the user routes with failure", () => {
  beforeAll(async () => {
    await connection();
    const user = await new CreateUserService().execute({ ...userData });

    const productRepository = getRepository(Product);
    const product = productRepository.create({ ...productData });

    const login = await request(app).post("/login").send({
      email: userData.email,
      password: userData.password,
    });

    userId = user.id;
    productId = product.id;
    token = login.body.token;
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let userId = "";
  let productId = "";
  let token = "";

  const userData = {
    name: "teste",
    email: "user@teste.com",
    password: "12345678",
  };

  const productData = {
    name: "teste",
    description: "description teste",
    price: 50,
  };

  it("Should not be able to create a new product if not admin", async () => {
    const response = await request(app)
      .post("/products")
      .send(productData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
    expect(response.status).toBe(401);
  });

  it("Should not be able to get the product informations with wrong id", async () => {
    const response = await request(app).get(`/products/${productId}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
    expect(response.status).toBe(400);
  });

  it("Should not be able to update the product informations if not adm", async () => {
    const updateProductData = {
      name: "teste update",
      description: "description update",
      price: 25,
    };

    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(updateProductData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
    expect(response.status).toBe(401);
  });

  it("Should not be able to delete the product informations if not adm", async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
    expect(response.status).toBe(401);
  });
});
