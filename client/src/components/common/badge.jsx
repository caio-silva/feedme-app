import React from "react";

const Badge = props => {
  const { text, qnty } = props;
  return (
    <button type="button" className="btn btn-primary badge-button mr-1">
      {text} <span className="badge badge-light">{qnty}</span>
    </button>
  );
};

export default Badge;
