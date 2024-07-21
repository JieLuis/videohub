import React from "react";
import "./index.css";

const Shrink = () => {
  return (
    <div className="s-container">
      <form id="image-form">
        <div className="file-field input-field">
          <div className="btn">
            <span>Browse</span>
            <input type="file" id="img" />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload file"
            />
          </div>
        </div>
        <p>
          <strong>Quality:</strong>
          <em>The lower the quality, the smaller the filesize</em>
        </p>
        <p className="range-field">
          <input type="range" id="slider" min="0" max="100" />
        </p>

        <input type="submit" className="black btn" value="Resize" />
      </form>

      <div className="card output">
        <div className="card-content">
          Output Path: <span id="output-path"></span>
        </div>
      </div>
    </div>
  );
};

export default Shrink;
