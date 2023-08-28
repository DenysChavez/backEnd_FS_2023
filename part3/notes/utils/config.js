require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI.replace("%s", process.env.PASSWORD)

module.exports = {
  MONGODB_URI,
  PORT
}