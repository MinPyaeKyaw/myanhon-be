import Request from 'supertest'
import app from '../..'

describe('admin middlewares', () => {
  it('POST / admin / reset password / unauthorized access', async () => {
    await Request(app)
      .post(process.env.API_PREFIX + '/admin/auth/reset-password')
      .send({
        email: 'postman@test.com',
        newPassword: '12345',
      })
      .expect(401)
      .then(response => {
        expect(response.body).toEqual({
          status: 401,
          message: 'Unthorizied access!',
          data: null,
        })
      })
  })

  it('POST / user / reset password / invalid token', async () => {
    await Request(app)
      .post(process.env.API_PREFIX + '/admin/auth/reset-password')
      .set(
        'Authorization',
        'bearer ' +
          '1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A',
      )
      .send({
        email: 'postman@test.com',
        newPassword: '12345',
      })
      .expect(401)
      .then(response => {
        expect(response.body).toEqual({
          status: 401,
          message: 'Invalid token!',
          data: null,
        })
      })
  })
})
