/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "./Section";

const More = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);

    
  // Function to fetch data from multiple URLs concurrently
  const fetchData = async (urls) => {
    const results = await Promise.all(urls.map((url) => axios.get(url)));
    return results.map((res) => res.data);
  };

  useEffect(() => {
    const getFilmData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://swapi.dev/api/films/${id}`);
        const filmData = response.data;
        const [characters, planets, species, starships, vehicles] =
          await Promise.all([
            fetchData(filmData.characters),
            fetchData(filmData.planets),
            fetchData(filmData.species),
            fetchData(filmData.starships),
            fetchData(filmData.vehicles),
          ]);

        setFilm({
          ...filmData,
          characters,
          planets,
          species,
          starships,
          vehicles,
        });
      } catch (err) {
        console.error(err.message);
        setFilm(null);
      } finally {
        setLoading(false);
      }
    };

    getFilmData();
  }, [id]);
  const handleClick = () => { // this does not work WebGLUniformLocation, it should take you to the list pageXOffset, try changing the id on the url three times and clicking the back button, it should also have a cursor point
    // navigate(-1);
    navigate("/")
  };

  return (
    <div>
      {loading ? (
        <Loader className="loader" />
      ) : (
        <div className="details">
          <header>
            <div className="back">
              <button className="pointer" onClick={handleClick}>&larr; Back to list</button>
            </div>
            <h2>{film.title}</h2>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
          </header>
          {/* <div style={{ marginBottom: "1rem"}}>
            <h4 className="gray">Description</h4>
            <p>{film.opening_crawl}</p>
          </div> */}
          <Section title="Description" description={film.opening_crawl} />

          <Section title="Characters" items={film.characters} />
          <Section title="Planets" items={film.planets} />
          <Section title="Species" items={film.species} />
          <Section title="Starships" items={film.starships} />
          <Section title="Vehicles" items={film.vehicles} />
        </div>
      )}
    </div>
  );
};

export default More;