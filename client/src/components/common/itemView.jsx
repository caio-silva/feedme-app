import React from "react";
import { Link } from "react-router-dom";

const ItemView = ({ src, title, id, sourceUrl, ...rest }) => {
  function shortenTitle(title) {
    const _ = title.substr(0, 31);
    return _.substr(0, _.lastIndexOf(" "));
  }

  title = title.length <= 30 ? title : shortenTitle(title);
  return (
    <Link to={`/recipes/${id}`} style={{ cursor: "pointer" }}>
      <div className="card my-card" style={{ width: "14rem", height: "14rem" }}>
        <img src={src} className="card-img-top" alt={title} />
        <div className="card-body ">
          <span className="card-title">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemView;
