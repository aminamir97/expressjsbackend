const { Router } = require("express");

const router = Router();
const db = require("../helpers/sql");

router.get("/api/teacher/gethws/:teacherId", async (req, res) => {
  const tId = req.params.teacherId;
  console.log(tId);
  try {
    const allHws = await db.query(
      "select homeworks.id ,homeworks.name , homeworks.description , homeworks.created_at , homeworks.submit_date , students.name as sname FROM homeworks INNER JOIN students  ON students.id = homeworks.for_user where homeworks.teacher= $1",

      [tId]
    );
    const resp = { result: true, data: allHws.rows, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error.message };
    res.send(resp);
  }
});
router.post("/api/teacher/addhw/:tid", async (req, res) => {
  const { name, desc, submit_date, foruserid } = req.body;
  const tId = req.params.tid;

  try {
    const currentDate = new Date();
    console.log(currentDate);
    const values = [name, desc, submit_date, foruserid, tId];
    const query = await db.query(
      "insert into homeworks(name,description,submit_date,for_user,teacher) values ($1,$2,($3),$4,$5)",
      values
    );
    const queryResult = query.rowCount > 0;
    console.log(query.rowCount);
    const resp = { result: true, data: queryResult, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error.message };
    res.send(resp);
  }
});
router.delete("/api/teacher/deletehw/:hw", async (req, res) => {
  //DELETE FROM TESTIMONIALS WHERE id = 6

  try {
    const hwid = req.params.hw;
    const values = [hwid];
    const query = await db.query("delete from homeworks where id = $1", values);
    const queryResult = query.rowCount > 0;
    console.log(query);
    const resp = { result: queryResult, data: queryResult, message: "" };
    res.send(resp);
  } catch (error) {
    const resp = { result: false, data: [], message: error.message };
    res.send(resp);
  }
});
router.put("/api/teacher/edithw/:hw", async (req, res) => {
  //UPDATE consumer_profiles SET fullname_ar='balqees walid turk', fullname_en= 'balqees walid turk', nationality = 2, birth_date= '1998-05-19', gender='female' WHERE user_id=1
  const { name, desc, submit_date } = req.body;
  const hwid = req.params.hw;

  try {
    const currentDate = new Date();
    console.log(currentDate);
    const values = [name, desc, submit_date, hwid];
    const query = await db.query(
      "UPDATE homeworks SET name=$1, description=$2, submit_date=$3 WHERE id=$4",
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

module.exports = router;
