import { getConnection, getRepository } from "typeorm";
import app from "../../app";
import request from "supertest";
import connection from "../../database";
import User from "../../entities/User";
import Address from "../../entities/Address";

describe("Testing the addresses routes with success", () => {
    beforeAll(async () => {
        await connection();
    });
  
    afterAll(async () => {
        const userRepository = getRepository(User);
        await userRepository.delete({ id: userId });
  
        const defaultConnection = getConnection("default");
        await defaultConnection.close();
    });

    let addressId = "";
    let userId = "";
    let token = "";

    const addressData = {
        city: "Cidade de Teste",
        street: "Rua de teste",
        number: 10
    };

    const userData = {
        name: "teste",
        email: "teste@teste.com",
        password: "12345678",
    };

    it("Should be able to create a new address if authenticated", async () => {
        const userResponse = await request(app).post("/users").send(userData);
        userId = userResponse.body.id;

        const loginResponse = await request(app).post("/login").send({
            email: userData.email,
            password: userData.password,
        });
        token = loginResponse.body.token;

        const response = await request(app).post("/addresses").send(addressData).set({
            Authorization: `Bearer ${token}`,
        });

        addressId = response.body.id;

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("city");
        expect(response.body).toHaveProperty("street");
        expect(response.body).toHaveProperty("number");
        expect(response.body).toHaveProperty("user");
        expect(response.status).toBe(201);
    });

    it("Should be able to list my addresses if authenticated", async () => {
        const response = await request(app).get("/addresses").set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    it("Should be able to get a address informations if owner", async () => {
        const response = await request(app).get(`/addresses/${addressId}`).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.body.userId).toBe(userId);
        expect(response.body.city).toBe(addressData.city);
        expect(response.body.street).toBe(addressData.street);
        expect(response.body.number).toBe(addressData.number);
        expect(response.status).toBe(200);
    });

    it("Should be able to update a address if owner", async () => {
        const updateAddressData = {
            city: "Update test"
        };

        const response = await request(app)
            .patch(`/addresses/${addressId}`)
            .send(updateAddressData)
            .set({
                Authorization: `Bearer ${token}`,
            });
        
        expect(response.body.city).toBe(updateAddressData.city);
        expect(response.status).toBe(200);
    });

    it("Should be able to delete a address if owner", async () => {
        const response = await request(app).delete(`/addresses/${addressId}`).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(204);
    });
});


describe("Testing the addresses routes with success", () => {
    beforeAll(async () => {
        await connection();
    });
  
    afterAll(async () => {
        const userRepository = getRepository(User);
        await userRepository.delete({ id: firstUserId });
        await userRepository.delete({ id: secondUserId });

        const addressRepository = getRepository(Address);
        await addressRepository.delete({ id: addressId });

        const defaultConnection = getConnection("default");
        await defaultConnection.close();
    });

    let firstUserId = "";
    let secondUserId = "";
    let addressId = "";
    let token1 = "";
    let token2 = "";

    const userData = {
        name: "teste",
        email: "teste@teste.com",
        password: "12345678",
    };

    const secondUserData = {
        name: "teste2",
        email: "teste2@teste.com",
        password: "12345678",
    };

    const addressData = {
        city: "Cidade de Teste",
        street: "Rua de teste",
        number: 10
    };

    it("Should not be able to create a new address if not authenticated", async () => {
        const response = await request(app).post("/addresses").send(addressData);

        expect(response.status).toBe(401);
    });

    it("Should not be able to create a new address if missing fields", async () => {
        const firstUserResponse = await request(app).post("/users").send(userData);
        firstUserId = firstUserResponse.body.id;

        const firtsLoginResponse = await request(app).post("/login").send({
            email: userData.email,
            password: userData.password,
        });
        token1 = firtsLoginResponse.body.token;

        const response = await request(app).post("/addresses").send().set({
            Authorization: `Bearer ${token1}`,
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to list my addresses if not authenticated", async () => {
        const response = await request(app).get("/addresses");

        expect(response.status).toBe(401);
    });

    it("Should not be able to get a address informations if not the owner", async () => {
        const secondUserResponse = await request(app).post("/users").send(secondUserData);
        secondUserId = secondUserResponse.body.id;

        const secondLoginResponse = await request(app).post("/login").send({
            email: secondUserData.email,
            password: secondUserData.password,
        });
        token2 = secondLoginResponse.body.token;

        const addressResponse = await request(app).post("/addresses").send(addressData).set({
            Authorization: `Bearer ${token1}`,
        });

        addressId = addressResponse.body.id;

        const response = await request(app).get(`/addresses/${addressId}`).set({
            Authorization: `Bearer ${token2}`,
        });

        expect(response.status).toBe(401);
    });

    it("Should not be able to update a address if not the owner", async () => {
        const updateAddressData = {
            city: "Update test"
        };

        const response = await request(app)
            .patch(`/addresses/${addressId}`)
            .send(updateAddressData)
            .set({
                Authorization: `Bearer ${token2}`,
            });
        
        expect(response.status).toBe(401);
    });

    it("Should not be able to delete a address if not the owner", async () => {
        const response = await request(app).delete(`/addresses/${addressId}`).set({
            Authorization: `Bearer ${token2}`,
        });

        expect(response.status).toBe(401);
    });

});