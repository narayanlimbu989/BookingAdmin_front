import React from "react";

const Costominput = (props) => {
  const { type, placeholder, title, id, onChange } = props;
  return (
    <div>
      <label className="fs-5 text-success">{title}</label>
      <br />
      <input
        id={id}
        onChange={onChange}
        className="inputarea fs-5 mt-1"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Costominput;
