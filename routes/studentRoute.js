const { Router } = require("express");
const router = Router();
const db = require("../helpers/sql");

router.get("/api/student/gethws", async (req, res) => {
  try {
    const allHws = await db.query(
      "select homeworks.id ,homeworks.name , homeworks.description , homeworks.created_at , homeworks.submit_date , teachers.name as tname FROM homeworks INNER JOIN teachers  ON teachers.id = homeworks.teacher"
    );
    const resp = { result: true, data: allHws.rows, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error };
    res.send(resp);
  }
});
router.get("/api/student/gethws/:studentid", async (req, res) => {
  const stId = req.params.studentid;
  console.log("user = ", stId);
  try {
    const allHws = await db.query(
      "select homeworks.id ,homeworks.name , homeworks.description , homeworks.created_at , homeworks.submit_date , teachers.name as tname FROM homeworks INNER JOIN teachers  ON teachers.id = homeworks.teacher where homeworks.for_user= $1",
      [stId]
    );
    const resp = { result: true, data: allHws.rows, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error };
    res.send(resp);
  }
});

router.get("/api/student/getAllStudents", async (req, res) => {
  try {
    const allHws = await db.query("select * from students");
    const resp = { result: true, data: allHws.rows, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error };
    res.send(resp);
  }
});

module.exports = router;
