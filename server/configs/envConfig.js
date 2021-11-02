const dotenv = require("dotenv")
dotenv.config();

const dbconxnUrl = process.env.DATABASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASS
module.exports = {
    dbconxnUrl,
    email,
    password
}