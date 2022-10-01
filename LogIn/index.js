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

//에러 CORS 
//자신이 속하지 않은 도메인, 다른 프로토콜 다른 포트에 있는 리소를 
//요청하는 cross-origin HTTP 요청방식.
//서버는 기본적으로 CORS방식을 제한함.
//특정 서버 리소스에 다른 임의의 웹사이트들이 request를 보낼수있다면
//악의적으로 특정 서버의 세션을 탈취 혹은 무리가 가는 행위 등의 문제를 야기할 수 있음
app.use(cors(corsOption));

//에러 데이터전달
//request.body에 있는 데이터에 접근하기 위해 사용 
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

//회원가입
app.post('/user', () => {

})

//로그인
app.post("/login", (req, res) => {
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