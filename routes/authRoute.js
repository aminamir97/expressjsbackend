const { Router } = require("express");
const router = Router();
const db = require("../helpers/sql");
const authControllers = require("../controllers/auth.controller");

router.post("/api/auth/student/signup", async (req, res) => {
  const { name, email, password, grade } = req.body;
  try {
    const values = [name, email, password, grade];
    const query = await db.query(
      "insert into students( name,email,password,grade) values ($1,$2,($3),$4)",
      values
    );
    const queryResult = query.rowCount > 0;
    console.log(query.rowCount);
    const resp = { result: queryResult, data: queryResult, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error.message };
    res.send(resp);
  }
});
router.post("/api/auth/student/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email + "and ", password);
  try {
    const values = [email, password];
    const query = await db.query(
      "select * from students where email=$1 and password=$2",
      values
    );
    console.log("how many results ", query.rowCount);
    const queryResult = query.rowCount == 1;
    if (queryResult) {
      console.log("id of the success user = ", query.rows[0].id);
      const successUserId = query.rows[0].id;
      const token = await authControllers.loginSuccess(successUserId);

      const dbAuthHandler = await authControllers.handleDbAuth({
        db: db,
        userId: successUserId,
        token: token,
      });

      res.cookie("atoken", token, { secure: true });
      res.cookie("userType", "student", { secure: true });

      const resp = {
        result: dbAuthHandler,
        data: { userId: successUserId, token: token },
        message: "success and signned user and authenticated with the db",
      };
      res.send(resp);
    } else {
      throw "Couldnt find the user";
    }
  } catch (error) {
    const resp = { result: false, data: [], message: error + error.message };
    res.send(resp);
  }
});
router.post("/api/auth/student/logout", (req, res) => {
  res.clearCookie("atoken");
  res.send("success logout");
});

router.post("/api/auth/teacher/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const values = [email, password];
    const query = await db.query(
      "select * from teachers where email=$1 and password=$2",
      values
    );
    console.log("how many results ", query.rowCount);
    const queryResult = query.rowCount == 1;
    if (queryResult) {
      console.log("id of the success user = ", query.rows[0].id);
      const successUserId = query.rows[0].id;
      const token = await authControllers.loginSuccess(successUserId);

      const dbAuthHandler = await authControllers.handleDbAuthTeacher({
        db: db,
        userId: successUserId,
        token: token,
      });

      res.cookie("atoken", token);
      res.cookie("userType", "teacher");

      const resp = {
        result: dbAuthHandler,
        data: { teacherId: successUserId, token: token },
        message: "success and signned user and authenticated with the db",
      };
      res.send(resp);
    } else {
      throw "Couldnt find the user";
    }
  } catch (error) {
    const resp = { result: false, data: [], message: error + error.message };
    res.send(resp);
  }
});
router.post("/api/auth/teacher/logout", (req, res) => {
  res.clearCookie("atoken");
  res.send("success logout");
});

module.exports = router;
