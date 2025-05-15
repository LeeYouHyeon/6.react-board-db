import Table from 'react-bootstrap/Table';
// import { boardList } from '../data/data';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BoardList() {
  // 비동기로 board 테이블에 있는 전체 값을 가져오기
  const [boardList, setBoardList] = useState(null);

  const getBoardData = async () => {
    const response = await axios.get('/list'); // server.js res.send()를 받아옴
    setBoardList(response.data);
  };

  // useEffect : 마운트될 때와 업데이트될 때 호출(실행)
  // useEffect(function, deps)
  // deps: 배열 형태, 배열 안에서 검사하고자 하는 값을 주거나 빈 배열
  // []: 마운트될 때만 실행
  // [name] : name이 업데이트될 때마다
  // x : 렌더링될 때마다
  useEffect(() => {
    getBoardData();
  }, []);

  if (!boardList) return <div className="boardList">데이터가 없습니다.</div>

  return (
    <div className="boardList">
      <h2>Board List Page</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Reg_Date</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map(article =>
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>
                  <Link to={`/view/${article.id}`}>{article.title}</Link>
                </td>
                <td>{article.writer}</td>
                <td>{article.reg_date.substring(0, article.reg_date.indexOf('T'))}</td>
              </tr>)
          }
        </tbody>
      </Table>

      {/* 글쓰기 버튼 추가 */}
      <Link to="/write"><Button variant="primary">글쓰기</Button></Link>
    </div>
  );
};