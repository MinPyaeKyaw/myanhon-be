import { generateOTPCode, refreshVerificationCode, hashPassword, getJwtToken, verifyPassword, getJwtTokenFromReq } from "../utils/functions"
import { testUser, tokenSecrets } from "../utils/testEnums";

describe('Utils', () => {
    it('Utils / functions / generate OTP codes with 6 length', () => {
        expect(typeof generateOTPCode()).toBe('string');
        expect(generateOTPCode().length).toBe(6);
    })

    it('Utils / functions / refresh verification code success', async () => {
        expect(await refreshVerificationCode('useremail@example.com')).toBe(true);
    })

    it('Utils / functions / refresh verification code fail', async () => {
        expect(await refreshVerificationCode('useremailfailemail@example.com')).toBe(false);
    })

    it('Utils / functions / hash password', async () => {
        let password = 'examplePassword';
        expect(hashPassword(password)).not.toBe(password);
    })

    it('Utils / function / verify password', async () => {
        expect(typeof await verifyPassword('userpassword', 'dbpassword')).toBe('boolean');
    })

    it('Utils / function / getUserJwtToken', async () => {
        let data = {
            name: testUser.name,
            password: testUser.password
        }

        expect(typeof getJwtToken(data, tokenSecrets)).toBe('string');
    })

    it('Utils / functions / get jwt token form req / req with token', () => {
        expect(typeof getJwtTokenFromReq('bearer jwt token')).toBe('string');
    })

    it('Utils / functions / get jwt token form req / req without token', () => {
        expect(getJwtTokenFromReq(undefined)).toBe(false);
    })
})