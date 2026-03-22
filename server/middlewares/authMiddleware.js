// import jwt from 'jsonwebtoken'

// const protect = async (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).token({message: 'Unauthorized'});
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//          return res.status(401).token({message: 'Unauthorized'});
//     }
// }

// export default protect;

import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Accept both "Bearer token" and "token"
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default protect;
