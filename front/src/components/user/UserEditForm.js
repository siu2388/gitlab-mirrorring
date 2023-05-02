import React, { useState } from "react";
import { Button, Form, Card, Col, Row, Modal } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [image, setImage] = useState("");
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [blog, setBlog] = useState(user.blog);
  const [github, setGithub] = useState(user.github);
  const [description, setDescription] = useState(user.description);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [bgColor, setBgColor] = useState(user.bgColor);
  const [boxColor, setBoxColor] = useState(user.boxColor);
  const [menuColor, setMenuColor] = useState(user.menuColor);
  const [homeName, setHomeName] = useState(user.homeName);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image", image);
    console.log("name", name);
    console.log("bgColor", bgColor);
    console.log("boxColor", boxColor);
    console.log("menuColor", menuColor);
    console.log("homeName", homeName);

    const data = {
      name,
      email,
      github,
      blog,
      description,
      image,
      bgColor,
      boxColor,
      menuColor,
      homeName,
    };

    console.log("data", data);

    const isValidGithub =
      (github.startsWith("https://") || github.startsWith("http://")) && github;

    if (!isValidGithub) {
      setGithub(`https://${github}`);
      data.github = `https://${github}`;
    }

    const isValidBlog =
      (blog.startsWith("https://") || blog.startsWith("http://")) && blog;

    if (!isValidBlog) {
      setBlog(`https://${blog}`);
      data.blog = `https://${blog}`;
    }
    if (!isValidBlog) {
      setBlog(`https://${blog}`);
      data.blog = `https://${blog}`;
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, data);
    // 유저 정보는 response의 data임.

    const updatedUser = res.data;

    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Modal show={show} animation={false} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>유저 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form.Group controlId="userEditImage" className="mb-3">
            <Form.Label>프로필 사진 변경</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="userEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditGithub" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditBlog" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Blog"
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </div>

        <div>
          <Form.Label>홈피 설정</Form.Label>
          <Form.Group controlId="userEditHomeName">
            <Form.Control
              type="text"
              placeholder="미니홈피 이름"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
            />
          </Form.Group>

          <Form.Label>배경 색상 선택</Form.Label>
          <Form.Group controlId="userEditBgColor">
          <Form.Control
            type="color"
            value={bgColor}
            onChange= {(e) => setBgColor(e.target.value)}
          />
          </Form.Group>

          <Form.Label>박스 색상 선택</Form.Label>
          <Form.Group controlId="userEditBoxColor">
          <Form.Control
            type="color"
            value={boxColor}
            onChange= {(e) => setBoxColor(e.target.value)}
          />
          </Form.Group>
          
          <Form.Label>메뉴 색상 선택</Form.Label>
          <Form.Group controlId="userEditMenuColor">
          <Form.Control
            type="color"
            value={menuColor}
            onChange= {(e) => setMenuColor(e.target.value)}
          />
          </Form.Group>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              onClick={(e) => {
                handleClose(e);
                handleSubmit(e);
              }}
            >
              확인
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                setIsEditing(false);
                handleClose(e);
              }}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditForm;
