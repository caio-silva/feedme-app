import React from "react";
import { Link } from "react-router-dom";

const ItemView = ({ src, title, id, sourceUrl, ...rest }) => {
  return (
    <Link to={`/recipes/${id}`}>
      <div className="card my-card" style={{ width: "14rem" }}>
        <img src={src} className="card-img-top" alt={title} />
        <div className="card-body align-self-center">
          <p className="card-title">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemView;
