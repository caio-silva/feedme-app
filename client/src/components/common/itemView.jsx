import React from "react";

const ItemView = ({ src, title, sourceUrl, ...rest }) => {
  return (
    <div className="card my-card" style={{ width: "14rem" }}>
      <img src={src} className="card-img-top" alt={title} />
      <div className="card-body align-self-center">
        <p className="card-title">{title}</p>
      </div>
    </div>
  );
};

export default ItemView;
