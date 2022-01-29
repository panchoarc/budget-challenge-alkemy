const bycrypt = require("bcryptjs");

const generateEncryptedPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  const isMatch = await bycrypt.compare(password, hash);
  return isMatch;
};

module.exports = {
  generateEncryptedPassword,
  comparePassword,
};
