import React from "react";

export default props => (
  <>
    Pääsivu{" "}<br/>
    <button value={1} onClick={props.clickBtn}>
      Lisää
    </button>{" "}<br/>
    <button value={2} onClick={props.clickBtn}>
      Muokkaa
    </button>{" "}
  </>
);