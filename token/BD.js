const MONGO_DB_ADDRESS = 'mongodb://localhost:27017/moviesdb';

const MONGO_URL = process.env.MONGO_URL || MONGO_DB_ADDRESS;

module.exports = MONGO_URL;
