import { Container, Card, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";
import "../layout.css";

function AwardCard({ award, isEditable, setIsEditing, setAwards }) {
  const handleDelete = async () => {
    await Api.delete("awardId", award.id).then(() => {
      setAwards((prevAwards) =>
        prevAwards.filter((prevAward) => prevAward.id !== award.id)
      );
    });
  };

  useEffect(() => {}, [award]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="component-card">
      <Card.Text>
        <div className="align-items-center">
          <div className="component-card-col-left">
            <span>{award?.title}</span>
            <br />
            <span className="text-muted">{award?.grade}</span>
            <br />
            <span className="text-muted">{award?.date}</span>
            <br />
            <span className="text-muted">{award?.description}</span>
          </div>
          {isEditable && (
            <div className="component-card-col-right" >
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="btn-edit"
              >
                편집
              </button>
              <>
                <button onClick={handleShow} className="btn-delete">
                  삭제
                </button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                  <Modal.Footer>
                    <button onClick={handleClose} className="btn-cancel">
                      취소
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        handleDelete();
                      }}
                      className="btn-confirm"
                    >
                      확인
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          )}
        </div>
      </Card.Text>
    </Container>
  );
}

export default AwardCard;
