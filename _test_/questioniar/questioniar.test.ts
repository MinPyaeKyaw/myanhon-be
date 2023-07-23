import Request from "supertest";
import app from "../..";

describe("Fetching questioniar", () => {
  it("GET / fetch questions", async () => {
    return Request(app)
      .get(process.env.API_PREFIX + "/questioniars")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          status: 200,
          message: "Successfully retrived!",
          data: expect.arrayContaining([
            {
              id: expect.any(String),
              question: expect.any(String),
              answers: expect.arrayContaining([
                {
                  id: expect.any(String),
                  answer: expect.any(String),
                  count: expect.any(Number),
                  questionId: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                },
              ]),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ]),
        });
      });
  });

  it("POST / submit questioniar", async () => {
    return Request(app)
      .post(process.env.API_PREFIX + "/questioniar-submit")
      .send({
        payload: [
          "c296f6b5-7114-43d4-a895-3f6daabd99fb",
          "bf7d79ed-61b4-4377-88d4-79a965bc7d0e",
        ],
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          status: 200,
          message: "Successfully submitted!",
          data: null,
        });
      });
  });
});
