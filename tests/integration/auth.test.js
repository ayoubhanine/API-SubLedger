import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../../app.js";
import { connectDB } from "../../config/db.js";
import User from "../../models/User.js";

dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Integration", () => {
  const user = {
    name: "Ayoub Test",
    email: `test${Date.now()}@gmail.com`,
    password: "123456",
    role: "user",
  };

  test("POST /auth/register", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Utilisateur créé");
  });

  test("POST /auth/login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  afterAll(async () => {
    await User.deleteOne({ email: user.email });
  });
});