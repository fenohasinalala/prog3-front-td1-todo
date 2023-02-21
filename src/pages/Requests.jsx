import React, { useState } from "react";
import { getMatches } from "../provider/getMatches";

export const Requests = () => {
  const [matches, setMatches] = useState([]);
  console.log(matches);
  return (
    <>
      <button onClick={() => getMatches().then((res) => console.log(res))}>
        getMatches
      </button>
      {matches.length === 0 ? null : <div>ok match</div>}
    </>
  );
};

export default Requests;
