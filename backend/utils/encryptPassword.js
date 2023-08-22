const bcrypt = require("bcrypt");

async function generateHashedPassword(password) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

module.exports = { generateHashedPassword };
