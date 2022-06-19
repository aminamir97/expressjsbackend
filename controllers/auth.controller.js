var jwt = require("jsonwebtoken");
// var cookieParser = require("cookie-parser");

const generateJwt = async (userid) => {
  const secret = process.env.SECRETJWT || "amin1997";
  var token = jwt.sign({ user: userid }, secret, { expiresIn: "1h" });
  return token;
};
const isValidToken = async (token) => {
  const secret = process.env.SECRETJWT || "amin1997";
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    console.log("error in token = ", error);
    return false;
  }
};

const handleDbAuth = async ({ db, userId, token }) => {
  //add auth to DB ,, if exist then update , if new then insert
  const isExistAuthBefore = await db.query(
    "select * from auth where for_user = $1",
    [userId]
  );
  var existAuth = isExistAuthBefore.rows.length;
  console.log("count row ", isExistAuthBefore.rowCount);

  var choosingProcess = "none now";

  if (existAuth == 1) {
    const values = [token, userId];
    const query = await db.query(
      "update auth set token=$1 where for_user=$2",
      values
    );
    if (query.rowCount !== 1) {
      throw "Query of updating auth not worked successfully";
    }
    choosingProcess = "updating existed token " + query.rowCount;
  } else if (existAuth == 0) {
    const values = [token, userId];
    const query = await db.query(
      "insert into auth(token , for_user) values ($1,$2)",
      values
    );
    if (query.rowCount !== 1) {
      throw "Query of inserting auth not worked successfully";
    }
    choosingProcess = "inserting new token " + query.rowCount;
  }
  console.log(existAuth, choosingProcess);
  return true;
};

const handleDbAuthTeacher = async ({ db, userId, token }) => {
  //add auth to DB ,, if exist then update , if new then insert
  const isExistAuthBefore = await db.query(
    "select * from auth where for_teacher = $1",
    [userId]
  );
  var existAuth = isExistAuthBefore.rows.length;
  console.log("count row ", isExistAuthBefore.rowCount);

  var choosingProcess = "none now";

  if (existAuth == 1) {
    const values = [token, userId];
    const query = await db.query(
      "update auth set token=$1 where for_teacher=$2",
      values
    );
    if (query.rowCount !== 1) {
      throw "Query of updating auth not worked successfully";
    }
    choosingProcess = "updating existed token " + query.rowCount;
  } else if (existAuth == 0) {
    const values = [token, userId];
    const query = await db.query(
      "insert into auth(token , for_teacher) values ($1,$2)",
      values
    );
    if (query.rowCount !== 1) {
      throw "Query of inserting auth not worked successfully";
    }
    choosingProcess = "inserting new token " + query.rowCount;
  }
  console.log(existAuth, choosingProcess);
  return true;
};

const authMiddleWare = async (req, res, next) => {
  console.log("urlasdasd == ", req.get("auth"));
  if (
    req.url.includes("login") ||
    req.url.includes("logout") ||
    req.url.includes("signup")
  ) {
    next();
  } else {
    const tokenInCookies = req.get("auth");
    if (tokenInCookies) {
      //token is exist , check if its valid
      console.log(tokenInCookies);
      const isValid = await isValidToken(tokenInCookies);
      if (isValid) next();
      else {
        console.log("token not valid ");
        res.send(401);
      }
      //res.redirect("LOGIN PAGE FOR EXAMPLE");
    } else {
      //token is not exist , reject request
      console.log("token not exist ");
      res.send(401);
    }
  }
};

module.exports = {
  loginSuccess: generateJwt,
  isValidToken,
  handleDbAuth,
  handleDbAuthTeacher,
  authMiddleWare,
};
