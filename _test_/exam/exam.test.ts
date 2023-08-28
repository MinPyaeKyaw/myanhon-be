import Request from 'supertest'
import app from '../..'

describe('Exam', () => {
  it('GET / get exam', async () => {
    await Request(app)
      .get(process.env.API_PREFIX + '/exam?type=typeId&level=levelId')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({
          status: 200,
          message: 'Successfully retrived!',
          data: expect.arrayContaining([
            {
              id: expect.any(String),
              name: expect.any(String),
              examId: expect.any(String),
              levelId: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              questions: expect.arrayContaining([
                {
                  id: expect.any(String),
                  question: expect.any(String),
                  sectionId: expect.any(String),
                  answers: expect.arrayContaining([
                    {
                      id: expect.any(String),
                      answer: expect.any(String),
                      isCorrect: expect.any(Boolean),
                      questionId: expect.any(String),
                      createdAt: expect.any(String),
                      updatedAt: expect.any(String),
                    },
                  ]),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                },
              ]),
            },
          ]),
        })
      })
  })

  // it("POST / submit exam", async () => {
  //   return Request(app)
  //     .post(process.env.API_PREFIX + "/exam-submit")
  //     .send({
  //       payload: "string payload",
  //     })
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual({
  //         status: 200,
  //         message: "Successfully submitted!",
  //         data: {
  //           id: expect.any(String),
  //           exam: expect.any(String),
  //           level: expect.any(String),
  //           result: expect.any(String),
  //           createdAt: expect.any(String),
  //           updatedAt: expect.any(String),
  //         },
  //       });
  //     });
  // });
})
