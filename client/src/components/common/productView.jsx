import React from "react";

const ProductView = props => {
  const { name, id, qnty, onMinusClick } = props;
  return (
    <div>
      <div className="col-10">
        <div className="row">
          <div className="col-6">{name}</div>
          <div className="col-2">
            <span
              style={{
                border: "1px solid black",
                padding: "0.5rem",
                cursor: "pointer"
              }}
              onClick={() => onMinusClick(id)}
            >
              -
            </span>
          </div>
          <div className="col-2">
            <span
              style={{ border: "1px solid black", padding: "0.5rem" }}
              onClick={() => onMinusClick(id)}
            >
              {qnty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
