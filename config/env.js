import dotenv from 'dotenv';
dotenv.config()

export const PORT = process.env.PORT || 5000;
export const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';
export const NODE_ENV = process.env.NODE_ENV || 'development';
