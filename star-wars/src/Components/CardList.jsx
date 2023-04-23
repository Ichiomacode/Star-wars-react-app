import React, { useEffect, useState } from "react";
import Logo from "../assets/images/star_wars_img.png";
import ClipLoader from "react-spinners/ClipLoader";
const CardList = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP Error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData.results);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="logo">
        <img src={Logo} alt="Movie Logo" style={{ width: "30rem" }} />
      </div>
      {loading && (
        <div className="loader">
          {" "}
          <ClipLoader color={"#ffe81f"} loading={loading} size={100} />
        </div>
      )}
      {error && <div>{`There is an error fetching your data - ${error}`}</div>}
      <div className="Cardlist">
      <ul className="listitem">
        {data &&
          data.map((item) => {
            return (
              <li key={item.episode_id}>
                <h2>{item.title}</h2>
                <p style={{color:"white"}}>{new Date(item.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p className="break">{item.opening_crawl.split('\n').slice(0,10).join('\n')}</p>
                <a href="#">More Info</a>
              </li>
            );
          })}
      </ul>
      </div>
    </div>
  );
};

export default CardList;