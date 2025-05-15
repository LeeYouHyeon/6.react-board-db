import { Link, useParams } from "react-router-dom"
// import { boardList } from "../data/data";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BoardModify() {
  // const idx = boardList.findIndex(b => b.id === Number(id));
  // const article = boardList[idx];
  const { id } = useParams();

  const [form, setForm] = useState({
    title: '',
    writer: '',
    contents: ''
  });
  const { title, writer, contents } = form;

  let loading = false, error = null;
  const getBoard = async () => {
    loading = true;

    try {
      const response = await axios.get(`/view/${id}`);
      const a = response.data[0];
      setForm({
        title: a.title,
        writer: a.writer,
        contents: a.contents
      });
    } catch (e) {
      error = e;
    }

    loading = false;
  };

  useEffect(() => {
    getBoard();
  }, []);

  if (loading) return <div className="boardModify">로딩중...</div>;
  if (error) {
    console.log(error);
    return <div className="boardModify">
      error!
      <Link to="/"><Button variant="primary">목록으로</Button></Link>
    </div>;
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const onSubmit = async () => {
    if (title === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (contents === '') {
      alert('내용을 입력하세요.');
      return;
    }

    try {
      await axios.post(`/update/${id}`, form);
      window.location.href = `/view/${id}`;
    } catch (e) {
      alert("오류가 발생했습니다.");
      console.log(e);
    }
  }

  return <div className="boardModify">
    <h2>Board Modify Page</h2>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onChange} />
        <Form.Label>Writer</Form.Label>
        <Form.Control type="text" value={writer} readOnly />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea"
          name="contents"
          value={contents}
          onChange={onChange}
          rows={10} />
      </Form.Group>
    </Form>

    <div className="text-center">
      <Button variant="warning" onClick={onSubmit}>수정</Button>
      <Link to={`/view/${id}`}><Button variant="primary">취소</Button></Link>
    </div>
  </div>
};