import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

const algo = 'HS256';

const jwt = {
  sign: (payload) => {
    return new SignJWT(payload)
      .setProtectedHeader({ algo })
      .setIssuedAt()
      .setIssuer('http://localhost:3000/')
      .setAudience('http://localhost:3000/')
      .setExpirationTime('2h')
      .sign(secret);
  },
  verify: async (token) => {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'http://localhost:3000/',
      audience: 'http://localhost:3000/',
    });
    return payload;
  },
};

export default jwt;
