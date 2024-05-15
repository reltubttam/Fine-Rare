export const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/fandr';
export const PORT = process.env.PORT || 3000;
export const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '100', 10);
