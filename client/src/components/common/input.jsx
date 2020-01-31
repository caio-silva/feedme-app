import React from "react";

const Input = ({ name, type, placeholder, error, ...rest }) => {
  return (
    <div className="col-8 formInput">
      <input
        {...rest}
        name={name}
        type={type}
        placeholder={placeholder}
        className="form-control text-center"
      />

      {error && <div className="mt-3 alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
