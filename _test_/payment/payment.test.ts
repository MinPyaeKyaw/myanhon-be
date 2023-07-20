import Request from 'supertest';
import app from '../..';
import { getPaymentToken } from '../../utils/functions';

describe('payment', () => {
    it('GET / payment / get payment token', async () => {
        expect(await getPaymentToken()).toEqual({
            code: "000",
            message: "Authentication Success",
            time: expect.any(String),
            response: {
                paymentToken: expect.any(String),
                expireIn: expect.any(String)
            }
        })
    })
})