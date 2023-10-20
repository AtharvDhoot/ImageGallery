import React from "react";

const Pagination = ({ mode, page, onPrev, onNext }) => {
  return (
    <div className="flex justify-center join mt-12 mb-12">
      {mode === "search" && (
        <>
          <button
            className="join-item btn"
            disabled={page === 1}
            onClick={onPrev}
          >
            «
          </button>
          <span className="join-item btn">Page {page}</span>
        </>
      )}
      <button className="join-item btn" onClick={onNext}>
        {mode === "gallery" ? "Refresh" : "»"}
      </button>
    </div>
  );
};

export default Pagination;
