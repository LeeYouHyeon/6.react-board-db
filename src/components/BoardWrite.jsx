import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BoardWrite() {
  // 게시글 객체 생성
  const [form, setForm] = useState({
    title: '',
    writer: '',
    contents: ''
  });
  const { title, writer, contents } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const onReset = () => {
    setForm({
      title: '',
      writer: '',
      contents: ''
    })
  };

  const onSubmit = async () => {
    // 등록 : form 객체를 서버로 보내 DB로 등록
    if (title === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (writer === '') {
      alert('작성자를 입력하세요.');
      return;
    }
    if (contents === '') {
      alert('내용을 입력하세요.');
      return;
    }

    try {
      await axios.post('/insert', form);
      window.location.href = '/';
    } catch (error) {
      alert('오류가 발생했습니다.');
      console.log(error);
    }
  }

  return <div className="boardWrite board">
    <h2>Board Write Page</h2>
    {/* 제목 작성자 내용 */}
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onChange} />
        <Form.Label>Writer</Form.Label>
        <Form.Control type="text"
          name="writer"
          value={writer}
          placeholder="작성자"
          onChange={onChange} />
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
      <Button variant='warning' onClick={onReset}>초기화</Button>
      <Link to="/"><Button variant="danger">취소</Button></Link>
      <Button variant="success" onClick={onSubmit}>등록</Button>
    </div>
  </div>;
};