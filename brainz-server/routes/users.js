const express = require("express"),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  SALT_ROUNDS = 10,
  UsersModel = require("../models/users");
router.post("/", async (req, res, next) => {
  // const { user_id } = req.body;
  // console.log(req.body)
  // const comparisons = await ComparisonsModel.getAllComparisons(parseInt(user_id));

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
