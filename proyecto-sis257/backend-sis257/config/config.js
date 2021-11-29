module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_TOKEN: require("crypto").createHmac("sha256", process.env.SECRET_KEY).update(process.env.SECRET_JWT).digest("hex")
};
