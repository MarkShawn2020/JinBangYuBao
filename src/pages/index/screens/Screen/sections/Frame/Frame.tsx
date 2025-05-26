import React from "react";
import "./style.css";

export const Frame = (): JSX.Element => {
  return (
    <div className="frame">
      <div className="div-2">
        <div className="frame-wrapper-2">
          <div className="div-3" />
        </div>

        <div className="text-wrapper-7">查大学</div>
      </div>

      <div className="div-2">
        <div className="div-4" />

        <div className="text-wrapper-7">查专业</div>
      </div>

      <div className="div-2">
        <div className="frame-wrapper-3">
          <div className="div-5" />
        </div>

        <div className="text-wrapper-7">招生计划</div>
      </div>
    </div>
  );
};
