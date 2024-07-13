const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

const registration = async (req, res) => {
  const { name, email, password, dob, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      name,
      email,
      password,
      dob,
      phone,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24hr" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email });
    if (!dbUser || !(await bcrypt.compare(password, dbUser.password))) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const user = dbUser.toJSON();
    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "1h" });
    delete user.password;
    delete user.phone;
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registration,
  login,
};
