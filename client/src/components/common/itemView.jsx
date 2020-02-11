import React from "react";
import { Link } from "react-router-dom";

const ItemView = ({ src, title, id, sourceUrl, ...rest }) => {
  function shortenTitle(title) {
    const _ = title.substr(0, 51);
    return _.substr(0, _.lastIndexOf(" "));
  }

  title = title.length <= 50 ? title : shortenTitle(title);
  return (
    <Link to={`/recipes/${id}`} style={{ cursor: "pointer" }}>
      <div
        className="card my-card text-center"
        style={{ backgroundColor: "#222" }}
      >
        <div style={{ overflow: "hidden" }}>
          <img src={src} className="card-img-top my-card-img" alt={title} />
        </div>
        <div className="my-card-body text-center">
          <span className="card-title mt-3">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemView;
