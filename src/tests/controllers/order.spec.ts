import { getConnection, getRepository } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";
import User from "../../entities/User";
import Order from "../../entities/Order";
import Product from "../../entities/Product";
import CreateUserService from "../../services/User/CreateUser.service";
import CreateProductService from "../../services/Products/CreateProduct.service";

describe("Testing the order routes with success", () => {
  beforeAll(async () => {
    await connection();
    const user = await new CreateUserService().execute({ ...admData });
    const userRepository = getRepository(User);

    await userRepository.update({ id: user.id }, { isAdm: true });
    const adm = await userRepository.findOneOrFail({ id: user.id });

    const newProduct = await new CreateProductService().execute({
      ...productData,
    });

    const productRepository = getRepository(Product);
    const product = await productRepository.findOneOrFail({
      name: newProduct.name,
    });

    productInfo.id = product.id;
    orderData.products = [productInfo];

    const login = await request(app).post("/login").send({
      email: admData.email,
      password: admData.password,
    });

    token = login.body.token;
    userId = adm.id;
    orderData.userId = userId;
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let token = "";
  let userId = "";
  let orderId = "";

  const admData = {
    name: "adm",
    email: "adm@teste.com",
    password: "12345678",
  };

  let productInfo = {
    id: "",
    quantity: 5,
  };

  const orderData = {
    order: { city: "teste", street: "teste", number: 5 },
    products: [productInfo],
    userId: "",
  };

  const productData = {
    name: "teste",
    description: "description teste",
    price: 50,
  };

  it("Should be able to create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .send(orderData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    orderId = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("street");
    expect(response.body).toHaveProperty("subtotal");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(201);
  });

  it("Should be able to get the order informations", async () => {
    const response = await request(app)
      .get(`/orders/${orderId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("street");
    expect(response.body).toHaveProperty("subtotal");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
  });

  it("Should be able to get the list of all orders if authenticated", async () => {
    const response = await request(app)
      .get(`/orders`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it("Should be able to update the order status if is adm", async () => {
    const updateOrderData = {
      status: "sent",
    };

    const response = await request(app)
      .patch(`/orders/${orderId}`)
      .send(updateOrderData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("street");
    expect(response.body).toHaveProperty("subtotal");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(updateOrderData.status);
  });

  it("Should be able to delete the order informations", async () => {
    const response = await request(app)
      .delete(`/orders/${orderId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });
});

describe("Testing the order routes with failure", () => {
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
    orderData.userId = userId;

    const orderRepository = getRepository(Order);
    const order = orderRepository.create({ ...orderData });
    orderId = order.id;
  });

  afterAll(async () => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id: userId });

    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let userId = "";
  let productId = "";
  let orderId = "";
  let token = "";

  const orderData = {
    city: "teste",
    street: "teste",
    number: 5,
    userId: "",
  };

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

  it("Should not be able to get the orders informations with wrong id", async () => {
    const response = await request(app)
      .get(`/orders/idinexistente5`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Order not found");
    expect(response.status).toBe(404);
  });

  it("Should not be able to update the order information if not adm", async () => {
    const updateOrderData = {
      status: "sent",
    };

    const response = await request(app)
      .patch(`/orders/${orderId}`)
      .send(updateOrderData)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
    expect(response.status).toBe(401);
  });

  it("Should not be able to get list of orders if not adm", async () => {
    const response = await request(app)
      .get(`/orders`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
    expect(response.status).toBe(401);
  });
});
