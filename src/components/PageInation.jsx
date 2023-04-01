import React from "react";

const PageInation = ({
  totalpost,
  itemperpage,
  setCurrentpage,
  currentpage,
}) => {
  let pages = [];
  for (let i = 1; i < Math.ceil(totalpost / itemperpage + 1); i++) {
    pages.push(i);
  }
  return (
    <div className="d-flex gap-2 pageination">
      page
      {pages.map((i, j) => (
        <button
          className={i == currentpage ? "pageactive" : ""}
          key={j}
          onClick={() => setCurrentpage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );
};

export default PageInation;
