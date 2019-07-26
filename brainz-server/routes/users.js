const express = require("express"),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  SALT_ROUNDS = 10,
  UsersModel = require("../models/users");

router.post("/", async (req, res, next) => {
  const { id } = req.body,
    userInfo = await UsersModel.checkUserByID(id);

  const welcome = [`Fear ${userInfo.f_name}, The Zombie Slayer.`,
  `Bow Down to ${userInfo.f_name}.`,
  `${userInfo.f_name} The killer of a million zombies.`,
  `Oh F*$@ It's ${userInfo.f_name}.`,
  `Oh man it's ${userInfo.f_name} again.`,
  `Hey ${userInfo.f_name} don't forget to double tap.`,
  `${userInfo.f_name} is training to be the next star of Zombieland.`,
  `World War Z's got nothing on ${userInfo.f_name}.`,
  `Fear the Walking Dead? ${userInfo.f_name} definitely does not.`,
  `If ${userInfo.f_name} was on the walking dead, there wouldn't be any zombies left.`,
  `What has the Zombiepocalypse got on ${userInfo.f_name}?`,
  `Hey ${userInfo.f_name}, how would you kill a zombie with toilet paper?`];

  res.json({ loginMessage: welcome[Math.floor(Math.random() * welcome.length - 1) + 1] })
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const checkEmail = await UsersModel.checkUser(email);

  //Error Codes for login:
  //1: Not found
  //2: Wrong Password or Username

  if (checkEmail.rowCount === 1) {
    let user = checkEmail.rows[0];
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!!comparePassword) {
      user["login"] = true;
      delete user.password;
      res.json(user);
    } else {
      res.json({
        // Wrong Password
        login: false,
        errorCode: 2
      });
    }
  } else {
    res.json({
      // Not Found
      login: false,
      errorCode: 1
    });
  }
});

router.post("/register", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const userInstance = new UsersModel(null, first_name, last_name, email, null);
  const checkEmail = await UsersModel.checkUser(email);

  //Error Codes for Register:
  //3: User already created
  //4: Database write error
  //5: Success

  if (checkEmail.rowCount === 0) {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const createUser = await userInstance.addUser(hashPassword);

    (createUser.rowCount === 1) ?
      res.json({
        createdAccount: true,
        errorCode: 5
      })
      :
      res.json({
        errorCode: 4
      });
  } else {
    res.json({
      errorCode: 3
    });
  }
});

module.exports = router;
