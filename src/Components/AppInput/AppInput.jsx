import React from "react";
import "./AppInput.scss";

function AppInput({ label = "Label here", ...otherProps }) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="appInput_label">{label}:</label>
        <input type="text" {...otherProps} className="appInput_input" />
      </div>
    </>
  );
}

export default AppInput;
