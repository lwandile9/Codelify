import React from "react";
import { Link } from 'react-router-dom';
import "../components/css/card.css";

function Card({ imageSrc, link, title, description }) {
  return (
    <div className="card-container">
      <div className="card-image">
        <Link to={link}>
          <img
            src={imageSrc}
            alt={title}
          />
        </Link>
      </div>

      <div className="card-title">{title}</div>

      <div className="card-body">
        <p>{description}</p>
      </div>

      <div className="card-footer">
        <p>Free to explore</p>
      </div>
    </div>
  );
}

export default Card;