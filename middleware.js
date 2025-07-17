import { jwt } from './src/utils/jwt.js';
import { permissionDB } from './database.js';

export const tokenVerification = async (req, res, next) => {
  const prevToken = req.headers.authorization;
  console.log('prevToken', prevToken);

  if (!prevToken || !prevToken.startsWith('Bearer')) {
    return res
      .status(401)
      .send({ message: "You're not authorized to view the dashboard." });
  }

  try {
    console.log('TOKEN VALIDATION STARTING...', prevToken);
    const [scheme, token] = prevToken.split(' ');
    const verifiedToken = await jwt.verify(token);
    console.log('TOKEN AFTER VERIFICATION', verifiedToken);
    const {
      claim: { sub, role },
      exp,
    } = verifiedToken;

    if (scheme === 'Bearer' && sub === 'demo') {
      let currTimeSeconds = Math.floor(Date.now() / 1000);
      console.log('TOKEN EXP. CHECK: ', exp, currTimeSeconds);
      if (exp > currTimeSeconds) {
        req.user_data = {
          verified: true,
          username: sub,
          user_role: role,
        };
        next();
      } else {
        return res.status(401).send({
          message: 'Token has expired. Please authenticate again.',
        });
      }
    } else {
      throw new Error('Need you to verify again.');
    }
  } catch (e) {
    return res.status(401).send({ message: `${e}` });
  }
};

// ============================================================================
// Utility below would really be a server side utility.
// ============================================================================

export const getRolePermissions = async (req, res, next) => {
  const userDataFromReq = req.user_data;
  const isVerified = userDataFromReq.verified;
  const userRole = userDataFromReq.user_role;

  console.log('USER ROLE', userRole);

  if (isVerified) {
    console.log('CHECKING PERMISSIONS ON USER:', userDataFromReq.username);
    const permissionSet = permissionDB.filter(
      (permissions) => permissions[userDataFromReq.user_role]
    );
    console.log('PERMISSION RETRIEVAL: ', permissionSet);
    const [userPermissions] = permissionSet;

    if (userPermissions[userRole].editAccess.includes('x')) {
      // we'll allow user to access
      res.status(200);
      next();
    } else {
      // don't have permission to access
      res.status(403);
      next();
    }
  }
  //TODO: handle if user is not verified
};
