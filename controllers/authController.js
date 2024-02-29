const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const handleLogin = async (req, res) => {
  const { user, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Credentials are required" });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser)
    return res.status(401).json({ message: `User did not match` }); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  const roles = Object.values(foundUser.roles);
  if (match) {
    //create JWT
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360s" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    // console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: `User ${result?.username} has logged in successfully`,
      accessToken,
      user: result?.username,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
