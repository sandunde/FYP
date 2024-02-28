import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Result.css";

const OMDBComponent = () => {
  const [movieData, setMovieData] = useState(null);
  const apiKey = "1a7669b3";
  const movieTitle = "avengers";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiKey, movieTitle]);

  return (
    <div>
      {movieData && (
        <Container fluid>
          <Row>
            <Col>
                <h2 className="movie-title">{movieData.Title}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={movieData.Poster} alt={movieData.Title} />
            </Col>
            <Col>
              <p>year: {movieData.Year}</p>
              <p>Language: {movieData.Language}</p>
              <p>Director: {movieData.Director}</p>
              <p>Actors: {movieData.Actors}</p>
              <p>Plot: {movieData.Plot}</p>
              <p>MPAA Rating: {movieData.Rated}</p>
              <Button>Genre Prediction</Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default OMDBComponent;
