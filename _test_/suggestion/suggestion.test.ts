import Request from 'supertest'
import app from '../..'

describe('Suggestion', () => {
  it('POST / submit suggestion', async () => {
    await Request(app)
      .post(process.env.API_PREFIX + '/suggestion')
      .send({
        title: 'Title string',
        suggestion: 'Suggestion string',
      })
      .expect(201)
      .then(response => {
        expect(response.body).toEqual({
          status: 201,
          message: 'Successfully submitted!',
          data: {
            id: expect.any(String),
            title: expect.any(String),
            suggestion: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        })
      })
  })
})
