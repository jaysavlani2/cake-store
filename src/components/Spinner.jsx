import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ css, size, loading }) => {
  return (
    <div className="min-h-96 h-96 py-44 flex justify-center">
      <ClipLoader css={css} size={size} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
