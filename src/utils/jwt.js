import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);
const alg = 'HS256';
const typ = 'JWT';

export const jwt = {
  sign: (payload) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg, typ })
      .setIssuedAt()
      .setIssuer('http://localhost:5173/')
      .setAudience('http://localhost:5173/')
      .setExpirationTime('10m')
      .sign(secret);
  },
  verify: async (token) => {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'http://localhost:5173/',
      audience: 'http://localhost:5173/',
    });
    return payload;
  },
};

/**
   * 
   * ##################################################
      PRODUCTION CODE NOTE: 
      Production code would of course be different for below func.
      The claims uniqueness would be very important.
      The 'jti' value would be based on UUID to ensure
      that tokens remain unique or the sub key would also be unique.
      In JS, we can use the UUID package. 
      ##################################################
    *
   */
export function initClaimGenerator(sub) {
  return {
    sub,
  };
}
