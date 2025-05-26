import React from "react";
import "./style.css";

export const Div = (): JSX.Element => {
  return (
    <div className="div">
      <div className="frame-2">
        <div className="frame-3">
          <div className="tesla-wrapper">
            <div className="tesla" />
          </div>
        </div>

        <div className="text-wrapper-25">一分一段</div>
      </div>

      <div className="frame-2">
        <div className="frame-4">
          <div className="frame-5" />
        </div>

        <div className="text-wrapper-25">省控线</div>
      </div>

      <div className="frame-2">
        <div className="frame-6" />

        <div className="text-wrapper-25">录取日程</div>
      </div>
    </div>
  );
};
