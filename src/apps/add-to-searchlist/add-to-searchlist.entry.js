import React, { useState } from "react";

import AddToSearchlist from "./add-to-searchlist.js";

function AddToSearchlistEntry() {
  const [clicked, setClicked] = useState(false);

  function onClick() {
    setClicked(true);
  }

  return <AddToSearchlist clicked={clicked} onClick={onClick} />;
}

export default AddToSearchlistEntry;
