import React, { useState } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Loaders from "../utils/loader";

const CollectionsMovies = ({ title, movies, onLoads }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataDetail, setDataDetail] = useState([]);

  //   const [loadingData, setLoadingData] = useState(false);

  if (onLoads) return <Loaders />;
  return (
    <React.Fragment>
      {Array.isArray(movies)
        ? movies.map((data, i) => {
            return (
              <Container
                className="mt-4"
                style={{ textAlign: "-webkit-center" }}
              >
                <Card key={i} style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={data.Poster}
                    alt="Movie Poster"
                  />
                  <Card.Body>
                    <Card.Title>
                      {data.Response === "True" ? data.Title : "Data Not Found"}
                    </Card.Title>
                    <Card.Text>{data.Plot}</Card.Text>
                    <Button
                      variant="primary w-full"
                      onClick={() => {
                        handleShow();
                        setDataDetail(data);
                      }}
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Container>
            );
          })
        : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dataDetail.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm  text-gray-400">
            Director: {dataDetail.Director}
          </p>
          <p className="text-sm  text-gray-400">Release: {dataDetail.Year}</p>
          <p className="text-sm  text-gray-400">
            Rating: {dataDetail.imdbRating}
          </p>
          <p className="text-sm  text-gray-400">Genre: "{dataDetail.Genre}"</p>
          <p className="text-1xl">{dataDetail.Plot}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default CollectionsMovies;
