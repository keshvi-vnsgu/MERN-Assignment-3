import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import './ShowCard.css';

function ShowCard(props) {
  const [show,setShow]=useState({}); 
  useEffect(()=>{
    console.log(props.show);
    setShow(props.show);
  },[])
 return (
  <div className="show-card">
  <img 
    className="show-image"
    src={show.image?.medium}
    alt={show.name}
  />

  <div className="show-content">
    <h1 className="show-name">{show.name}</h1>
    <p className="show-language">{show.language}</p>

    <a 
      href={show.url}
      target="_blank"
      rel="noopener noreferrer"
      className="show-link"
    >
      View Show
    </a>
  </div>
</div>
)
}

export default ShowCard
