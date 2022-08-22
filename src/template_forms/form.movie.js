import React, { useState, useEffect } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import axios from "axios";

const FormsMovie = () => {
  const [dataTitle, setDataTitle] = useState("");
  const [dataMovies, setDataMovies] = useState([]);
  const [dataMoviesDetail, setDataMoviesDetail] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   Fetch Daata from API
  useEffect(() => {
    let isFlushed = false;
    if (!isFlushed) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}&t=${dataTitle}`,
      })
        .then((results) => {
          setDataMovies([results.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      isFlushed = true;
    };
  }, [dataTitle]);

  //   End of Fetch Daata from API

  return (
    <React.Fragment>
      <div className="container mt-10 mx-auto md:px-80">
        <label for="search" className="text-2xl">
          Movie Title
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDataTitle(document.getElementById("searchMovie").value);
          }}
        >
          <div class="relative mt-2">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="searchMovie"
              class="block py-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <p className="text-2xl text-center mt-6  font-medium">Results</p>
      <div className=" mx-auto">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 justify-items-center">
          {/* <h1>{dataMovies}test</h1> */}
          {Array.isArray(dataMovies)
            ? dataMovies.map((data, i) => {
                return (
                  <Container style={{ textAlign: "-webkit-center" }}>
                    <Card key={i} style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={data.Poster}
                        alt="Movie Poster"
                      />
                      <Card.Body>
                        <Card.Title>
                          {data.Response === "True"
                            ? data.Title
                            : "Data Not Found"}
                        </Card.Title>
                        <Card.Text>{data.Plot}</Card.Text>
                        <Button
                          variant="primary w-full"
                          onClick={() => {
                            handleShow();
                            setDataMoviesDetail(data);
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
              <Modal.Title>{dataMoviesDetail.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm  text-gray-400">
                Director: {dataMoviesDetail.Director}
              </p>
              <p className="text-sm  text-gray-400">
                Release: {dataMoviesDetail.Year}
              </p>
              <p className="text-sm  text-gray-400">
                Rating: {dataMoviesDetail.imdbRating}
              </p>
              <p className="text-sm  text-gray-400">
                Genre: "{dataMoviesDetail.Genre}"
              </p>
              <p className="text-1xl">{dataMoviesDetail.Plot}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormsMovie;
