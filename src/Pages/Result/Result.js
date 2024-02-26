import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./Result.css";

const OMDBComponent = () => {
    const [movieData, setMovieData] = useState(null);
    const apiKey = "1a7669b3";
    const movieTitle = "De sas en sas";

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
                <div className="movie-container">
                    <h2>{movieData.Title}</h2>
                    <img src={movieData.Poster} alt={movieData.Title} />
                    <p>year: {movieData.Year}</p>
                    <p>Language: {movieData.Language}</p>
                    <p>Director: {movieData.Director}</p>
                    <p>Actors: {movieData.Actors}</p>
                    <p>Plot: {movieData.Plot}</p>
                    <p>MPAA Rating: {movieData.Rated}</p>
                    <Button>Genre Prediction</Button>
                </div>
            )}
        </div>
    );
};

export default OMDBComponent;
