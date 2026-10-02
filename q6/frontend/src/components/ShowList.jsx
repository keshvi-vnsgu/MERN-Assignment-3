import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ShowCard from './ShowCard';
import './ShowList.css';


function ShowList() {

  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/shows").then((res) => {
      console.log(res.data);
      setShows(res.data);
    });
  }, [])
  return (
  <div className="show-list">
    <h1 className=''>ShowBox</h1>

    <div className="show-grid">
      {
        shows.map((show) =>
          <ShowCard
            key={show.id}
            show={show}
          />
        )
      }
    </div>
  </div>
)
}

export default ShowList
