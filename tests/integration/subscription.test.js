import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../../app.js";

import User from "../../models/User.js";
import Subscription from "../../models/Subscription.js";

dotenv.config();

describe("Subscription API", () => {
  let token;
  let subscriptionId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({
      email: "subscription@test.com",
    });

    const register = await request(app)
      .post("/auth/register")
      .send({
        name: "Subscription Test",
        email: "subscription@test.com",
        password: "123456",
        role: "user",
      });

    expect(register.statusCode).toBe(201);

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: "subscription@test.com",
        password: "123456",
      });

    token = login.body.token;
  });

  afterAll(async () => {
    await Subscription.deleteMany({});
    await User.deleteMany({
      email: "subscription@test.com",
    });

    await mongoose.connection.close();
  });

  test("POST /subscriptions", async () => {
    const res = await request(app)
      .post("/subscriptions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Netflix",
        price: 120,
        billingCycle: "monthly",
      });

    expect(res.statusCode).toBe(201);

    expect(res.body.name).toBe("Netflix");

    subscriptionId = res.body._id;
  });

  test("GET /subscriptions", async () => {
    const res = await request(app)
      .get("/subscriptions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /subscriptions/:id", async () => {
    const res = await request(app)
      .put(`/subscriptions/${subscriptionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Netflix Premium",
        price: 180,
        billingCycle: "monthly",
      });

    expect(res.statusCode).toBe(200);

    expect(res.body.name).toBe("Netflix Premium");
  });

  test("DELETE /subscriptions/:id", async () => {
    const res = await request(app)
      .delete(`/subscriptions/${subscriptionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.message).toBe("Abonnement supprimé");
  });
});