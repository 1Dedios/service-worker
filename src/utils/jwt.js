import { SignJWT, jwtVerify } from 'jose';
import { rolesDB } from '../../database.js';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);
const alg = 'HS256';
const typ = 'JWT';
const joseExpTime = '1m';

export const jwt = {
  sign: (payload) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg, typ })
      .setIssuedAt()
      .setIssuer('http://localhost:5173/')
      .setAudience('http://localhost:5173/')
      .setExpirationTime(joseExpTime)
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

export function initClaimGenerator(sub, role) {
  return {
    sub,
    role,
  };
}

export async function tokenAssignment(username) {
  if (username === 'demo') {
    const isKnownUser = rolesDB.filter((user) => user[username]);
    console.log('USER KNOWN RES: ', isKnownUser);
    const [user] = isKnownUser;
    console.log('TOKEN ASSIGNMENT - ROLE: ', user[username].role);
    let claim = initClaimGenerator(username, user[username].role);
    const token = await jwt.sign({ claim });

    return { accessToken: token };
  } else {
    throw new Error('Invalid username and/or password.');
  }
}
