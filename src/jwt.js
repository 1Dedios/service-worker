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
      .setIssuer('https://freecodecamp.org')
      .setAudience('https://freecodecamp.org')
      .setExpirationTime('2h')
      .sign(secret);
  },
  verify: async (token) => {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'https://freecodecamp.org',
      audience: 'https://freecodecamp.org',
    });
    return payload;
  },
};

export default jwt;
