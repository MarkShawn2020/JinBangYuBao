import React from "react";
import "./style.css";

export const FrameWrapper = (): JSX.Element => {
  return (
    <div className="frame-wrapper">
      <div className="view">
        <div className="text-wrapper-8">完善信息，为您精准预测院校录取概率</div>
      </div>

      <div className="overlap">
        <div className="chart">
          <div className="overlap-group">
            <div className="view-2">
              <div className="group-2">
                <div className="text-wrapper-9">10</div>

                <div className="text-wrapper-10">可冲击&gt;</div>

                <div className="text-wrapper-11">推荐志愿</div>
              </div>

              <div className="group-3">
                <div className="text-wrapper-12">6</div>

                <div className="text-wrapper-13">较稳妥&gt;</div>
              </div>

              <div className="group-4">
                <div className="text-wrapper-14">10</div>

                <div className="text-wrapper-15">可保底&gt;</div>
              </div>
            </div>

            <div className="overlap-group-wrapper">
              <div className="vector-wrapper">
                <img
                  className="vector"
                  alt="Vector"
                  src="../../../../../assets/img/vector-1015.svg"
                />
              </div>
            </div>

            <div className="rectangle" />

            <div className="text-wrapper-16">本科批</div>

            <div className="text-wrapper-17">专科</div>

            <img className="img" alt="Vector" src="../../../../../assets/img/vector-1004.svg" />

            <div className="element" />

            <div className="ellipse" />

            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="text-wrapper-18">677分</div>

                <div className="text-wrapper-19">412-536名</div>

                <p className="p">
                  <span className="span">超过本省</span>

                  <span className="text-wrapper-20">99%</span>

                  <span className="span">的考生</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-wrapper-21">100分</div>

        <div className="text-wrapper-22">750分</div>

        <div className="text-wrapper-23">677分</div>

        <div className="rectangle-2" />

        <div className="rectangle-3" />

        <div className="text-wrapper-24">点击登录</div>
      </div>
    </div>
  );
};
