import { getConnection, getRepository } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";
import User from "../../entities/User";

describe("Testing the user routes", () => {
    beforeAll(async () => {
        await connection();
    });

    afterAll(async () => {
        const userRepository = getRepository(User)
        await userRepository.delete({ id: userId });

        const defaultConnection = getConnection("default");
        await defaultConnection.close();
    });

    let token = "";
    let userId = "";

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "teste",
            email: "teste@teste.com",
            password: "123456",
        });

        userId = response.body.id;

        expect(response.status).toBe(201);
    });

    it("Should be able to login with the created user", async () => {
        const response = await request(app).post("/login").send({
            email: "teste@teste.com",
            password: "123456"
        });

        token = response.body.token;

        expect(response.status).toBe(200);
    });

    it("Should be able to get the user profile informations", async () => {
        const response = await request(app)
            .get(`/user/${userId}`)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
    });

    it("Should be able to see user list if admin", async () => {
        const response = await request(app)
            .get("/users")
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
    });

    
});