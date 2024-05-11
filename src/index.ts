import mongoose from 'mongoose';
const MONGO_URL = "mongodb://mongo:27017"

mongoose.connect(MONGO_URL).then(() => console.log(`connected to MONGO_URL: ${MONGO_URL}`));

export default mongoose;

console.log('!')
