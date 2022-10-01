const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3307;
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOption ={
  origin : "http://localhost:3001",
  Credential : true,
};

app.use(cors(corsOption));

app.use(bodyParser.json());

const db = mysql.createPool({
  waitForConnections: true,
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "sys",
  connectionLimit: 1000,
  queueLimit: 1000,
  port: 3000 
});

app.post("/", (req, res) => {
  // console.log('3');
  // console.log(req.body);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3001');
  const sqlQuery = "SELECT * FROM LOG_IN WHERE USER_ID=?";
  db.query(sqlQuery, [req.body.id],(err, result) => {
    // console.log('4');
    if(err){
      console.log(err);
      res.send(err);
    }

    if(!result[0]){
      console.log('id가 없습니다. 회원가입하세요');
      res.statusCode = 401;
      res.send({
        message: 'no ID',
        code: 'e001'
      });
    }else if(result[0].USER_PW !== req.body.password){
      console.log("비밀번호가 다릅니다.");
      res.send("8");
    }else if(result[0].USER_ID === req.body.id){
      res.send(result);
    }else{
      console.log(null);
      res.send("0");
    }
    
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});