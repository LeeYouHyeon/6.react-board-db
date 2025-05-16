import { Link, useParams } from "react-router-dom"
// import { boardList } from "../data/data";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BoardView() {
  const { id } = useParams();

  // id에 해당하는 배열의 번지의 객체를 뿌려주기
  // findIndex : 특정 조건을 만족하는 요소의 index 리턴
  // const idx = boardList.findIndex(b => b.id === Number(id));
  // const article = boardList[idx];

  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    const response = await axios.get(`/view/${id}`);
    // response.data = [{}, {}, ...]. 값이 하나더라도 array로 들어옴
    setArticle(response.data[0]);
  }

  useEffect(() => {
    getArticle();
  }, []);

  if (!article) return <div className="boardView">로딩중...</div>;
  if (article === 'error') return <div className="boardView">error!</div>;

  const onDelete = async () => {
    try {
      // id를 경로에 달아서 파라미터로 보내기
      await axios.get(`/del/${id}`);
      window.location.href = '/';
    } catch(err) {
      alert('오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
  };

  return <div className="boardView board">
    <h2>Board View page</h2>
    <Card style={{ width: '800px', margin: '30px auto' }}>
      <Card.Body>
        <Card.Title
          style={{
            fontWeight: '700',
            marginBottom: '20px'
          }}>[{article.id}] {article.title}</Card.Title>
        <Card.Text style={{
          textAlign: "left"
        }}>{article.contents}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          Created on {article.reg_date.substring(0, article.reg_date.indexOf('T'))} by {article.writer}
        </Card.Text>
      </Card.Body>
      <Card.Body style={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        <Link to={`/modify/${article.id}`}>
          <Button variant="warning" style={{
            marginRight: "10px"
          }}>수정</Button>
        </Link>
        <Button variant="danger" onClick={onDelete}>삭제</Button>
      </Card.Body>
    </Card>
    <Link to="/"><Button variant="primary">목록</Button></Link>
  </div >
};