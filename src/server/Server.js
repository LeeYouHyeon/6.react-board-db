// 설치한 라이브러리를 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { useParams } = require('react-router-dom');

// express 사용하기 위한 app 생성
const app = express();

// express 서버 port 설정
const PORT = 5000;
// const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// mysql 접속
const db = mysql.createConnection({
  host: 'localhost',
  user: 'reactUser',
  password: 'mysql',
  port: '3306',
  database: 'react_board'
});

// express 접속
app.listen(PORT, () => {
  console.log(`server connecting on : http://localhost:${PORT}`);
});

// mysql  연결
db.connect((err) => {
  console.log(err ? 'fail' : 'success');
});

// root 기본 연결시 보여지는 기본 화면 설정
app.get('/', (req, res) => {
  res.send("Hello React World~!!");
});

// req : axios에서 부르는 쪽에서 데이터를 받으려는 변수
// res.send(내용) : 내용을 req에 보냄
app.get('/list', (req, res) => {
  const sql = 'select * from board order by id desc';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else res.send(data);
  });
});

// 게시글 상세 조회
app.get('/view/:id', (req, res) => {
  const sql = `select * from board where id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else res.send(data);
  })
});

// 글쓰기
app.post('/insert', (req, res) => {
  const { title, writer, contents } = req.body;

  const sql = 'insert into board(title, writer, contents) values (?,?,?)';
  db.query(sql, [title, writer, contents], (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.sendStatus(200);
  });
});

// 수정
app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const {title, contents} = req.body;

  const sql = 'update board set title=?, contents=? where id=?';
  db.query(sql, [title, contents, id], (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.sendStatus(200);
  });
});

// 삭제
app.get('/del/:id', (req, res) => {
  const id = req.params.id;
  const sql = `delete from board where id=${id}`;
  db.query(sql, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.sendStatus(200);
  });
});