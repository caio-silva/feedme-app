import React from "react";

const Badge = props => {
  const { text, qnty, isLoading } = props;
  return isLoading ? (
    ""
  ) : (
    <button type="button" className="btn button-color badge-button">
      {text} <span className="badge badge-light ">{qnty}</span>
    </button>
  );
};

export default Badge;
