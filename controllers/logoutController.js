const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ username: refreshToken }).exec();

  //Is refresh Token in the DB ?

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //Delete refresh Token in the DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log("Result", result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure : true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
