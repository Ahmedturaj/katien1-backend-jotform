import jwt from 'jsonwebtoken';
import {accessTokenSecrete} from '../../core/config/config.js';
import RoleType from '../../lib/types.js';
import User from '../../entities/auth/auth.model.js';
import { generateResponse } from '../../lib/responseFormate.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return generateResponse(res, 401, false, 'No token, auth denied', null);

  try {
    const decoded = jwt.verify(token, accessTokenSecrete);
    const user = await User.findById(decoded._id).select('-password -createdAt -updatedAt -__v');

    if (!user) {
      return generateResponse(res, 401, false, 'User not found', null);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return generateResponse(res, 401, false, 'Token expired', null);
    } else if (err.name === "JsonWebTokenError") {
      return generateResponse(res, 401, false, 'Token is not valid', null);
    } else if (err.name === "NotBeforeError") {
      return generateResponse(res, 401, false, 'Token not active', null);
    } else {
      next(err);
    }
  }
};




export const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;

    if (req.user.role !== RoleType.USER) {
      return res.status(403).json({ message: 'Admin access only' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


export const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token );
  
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    console.log(accessTokenSecrete)
    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;

    if (req.user.role !== RoleType.ADMIN) {
      return res.status(403).json({ message: 'Admin access only' });
    }

    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).json({ message: 'Token is not valid' });
  }
};


export const sellerMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;

    if (req.user.role !== RoleType.SELLER) {
      return res.status(403).json({ message: 'Seller access only' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const adminSellerMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;
    if (req.user.role !== RoleType.ADMIN && req.user.role !== RoleType.SELLER) {
      return res.status(403).json({ message: 'Admin or Seller access only' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const userAdminSellerMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;

    if (
      req.user.role !== RoleType.USER ||
      req.user.role !== RoleType.ADMIN ||
      req.user.role !== RoleType.SELLER
    ) {
      return res.status(403).json({ message: 'User, Admin or Seller access only' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



