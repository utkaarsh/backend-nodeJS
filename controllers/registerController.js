const User = require("../model/User");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const handleNewUsers = async (req, res) => {
  const { user, email, pwd } = req.body;
  if (!user || !email || !pwd)
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });

  //check for duplicates in our username
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.status(409).json({ Message: "Conflict" }); //conflict

  try {
    // encrypt the password - hash and salt the pasword
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      email: email,
      password: hashedPwd,
    });
    //send confirmation email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "drakebhai45@gmail.com",
        pass: "xxuf kwuc avro bmfx",
      },
    });

    const mailOPtions = {
      from: "utkarshranpise29@gmail.com",
      to: email,
      subject: "Welcome to Digiflake",
      text: `Thankyou ${user} for registering on Digiflake, Have a good day`,
    };

    transporter.sendMail(mailOPtions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error sending mail" });
      }

      res.status(200).json({ Message: `User ${user} registered successfully` });
    });

    console.log(result);
    res.status(201).json({ successfull: `New User ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { handleNewUsers };
