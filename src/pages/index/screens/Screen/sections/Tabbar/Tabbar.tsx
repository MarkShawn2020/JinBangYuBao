import React from "react";
import "./style.css";

export const Tabbar = (): JSX.Element => {
  return (
    <div className="tabbar">
      <div className="overlap-3">
        <div className="union-wrapper">
          <img className="union" alt="Union" src="../../../../../assets/img/union-1.svg" />
        </div>

        <img className="frame-11" alt="Frame" src="../../../../../assets/img/frame-1000004686.png" />

        <div className="frame-12">
          <img className="notes" alt="Notes" src="../../../../../assets/img/notes-1.svg" />

          <div className="text-wrapper-27">模拟填报</div>
        </div>

        <div className="img-wrapper">
          <img
            className="group-5"
            alt="Group"
            src="../../../../../assets/img/group-1000004252.png"
          />
        </div>

        <div className="frame-13">
          <div className="notes">
            <div className="overlap-group-2">
              <img className="vector-2" alt="Vector" src="../../../../../assets/img/vector-2.svg" />
            </div>
          </div>

          <div className="text-wrapper-27">志愿表</div>
        </div>

        <div className="frame-14">
          <img className="notes" alt="User" src="../../../../../assets/img/user-1.svg" />

          <div className="text-wrapper-27">我的</div>
        </div>
      </div>
    </div>
  );
};
