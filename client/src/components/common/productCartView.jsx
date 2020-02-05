import React from "react";

const ProductCartView = props => {
  const { name, id, onAddClick, onMinusClick } = props;
  return (
    <div>
      <div className="col-10">
        <div className="row">
          <div className="col-8">{name}</div>
          <div className="col-2">
            <span
              style={{
                border: "1px solid black",
                padding: "0.5rem",
                cursor: "pointer"
              }}
              onClick={() => onAddClick(id)}
            >
              +
            </span>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ProductCartView;
