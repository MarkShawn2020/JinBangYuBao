import React from "react";
import { IconChat1 } from "../../icons/IconChat1";
import { Div } from "./sections/Div";
import { DivWrapper } from "./sections/DivWrapper";
import { Frame } from "./sections/Frame";
import { FrameWrapper } from "./sections/FrameWrapper";
import { Group } from "./sections/Group";
import { GroupWrapper } from "./sections/GroupWrapper";
import { SectionComponentNode } from "./sections/SectionComponentNode";
import { Tabbar } from "./sections/Tabbar";
import "./style.css";

export class Screen extends React.Component {
  // 添加生命周期方法 - 页面显示时触发刷新数据
  componentDidShow() {
    // 获取所有 FrameWrapper 组件实例并刷新数据
    const frameWrapperInstances = document.querySelectorAll('.frame-wrapper') || [];
    
    // 通知刷新数据事件
    const refreshEvent = new CustomEvent('refreshFrameWrapper', { bubbles: true });
    frameWrapperInstances.forEach(el => {
      el.dispatchEvent(refreshEvent);
    });
    
    console.log('首页刷新数据');
  }
  render() {
    return (
    <div className="screen" data-model-id="672:11285">
      <div className="overlap-wrapper-2">
        <div className="overlap-5">
          <div className="overlap-6">
            <div className="rectangle-4" />

            <div className="frame-15">
              <div className="left-side">
                <div className="time-light-base">
                  <img
                    className="element-2"
                    alt="Element"
                    src="../../../assets/img/9-41.svg"
                  />

                  <div className="div-6">
                    <img
                      className="element-3"
                      alt="Element"
                      src="../../../assets/img/53.svg"
                    />

                    {/* <div className="text-wrapper-28">志愿通</div> */}

                    <img className="del" alt="Del" src="../../../assets/img/del-1.svg" />

                    <div className="view-3">
                      <img
                        className="element-4"
                        alt="Element"
                        src="../../../assets/img/54.svg"
                      />

                      <img className="image" alt="Image" src="../../../assets/img/2x.png" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-side">
                <img className="battery" alt="Battery" src="../../../assets/img/battery.png" />

                <img className="wifi" alt="Wifi" src="../../../assets/img/wifi.svg" />

                <img
                  className="mobile-signal"
                  alt="Mobile signal"
                  src="../../../assets/img/mobile-signal.svg"
                />
              </div>
            </div>

            <div className="rectangle-5" />

            <div className="unsplash" />

            <img
              className="frame-16"
              alt="Frame"
              src="../../../assets/img/frame-1171274963.svg"
            />

            <div className="rectangle-6" />

            <Group />
            <GroupWrapper />
            <DivWrapper />
            <Frame />
            <FrameWrapper />
            <Div />
            <div className="text-wrapper-29">热点招生资讯</div>

            <div className="text-wrapper-30">更多</div>

            <div className="rectangle-7" />

            <img
              className="frame-17"
              alt="Frame"
              src="../../../assets/img/frame-1171275009.svg"
            />

            <div className="frame-18">
              <div className="overlap-7">
                <div className="ellipse-2" />

                <img className="element-5" alt="Element" src="../../../assets/img/2-1.svg" />
              </div>
            </div>

            <div className="frame-19">
              <div className="overlap-7">
                <div className="ellipse-3" />

                <img className="element-6" alt="Element" src="../../../assets/img/2-1-1.svg" />

                <img className="element-7" alt="Element" src="../../../assets/img/1.svg" />
              </div>
            </div>

            <div className="frame-20">
              <div className="overlap-7">
                <div className="ellipse-2" />

                <img className="element-6" alt="Element" src="../../../assets/img/2-1-2.svg" />

                <div className="element-8">
                  <img className="element-9" alt="Element" src="../../../assets/img/1-1.svg" />
                </div>
              </div>
            </div>

            <div className="frame-21">
              <div className="overlap-7">
                <div className="ellipse-2" />

                <img className="element-6" alt="Element" src="../../../assets/img/2-1-3.svg" />

                <div className="element-8" />

                <div className="element-7" />
              </div>
            </div>

            <div className="frame-22">
              <div className="overlap-7">
                <div className="ellipse-3" />

                <img className="element-6" alt="Element" src="../../../assets/img/2-1-4.svg" />

                <div className="element-8" />
              </div>
            </div>

            <div className="frame-23">
              <div className="frame-24">
                <IconChat1 className="icon-chat" />
                <div className="text-wrapper-31">状元1对1</div>
              </div>
            </div>

            <div className="group-6">
              <div className="overlap-8">
                <img className="union-2" alt="Union" src="../../../assets/img/union.svg" />

                <div className="text-wrapper-32">更精准哦</div>
              </div>
            </div>

            <SectionComponentNode />
            <div className="frame-25">
              <div className="frame-24">
                <div className="frame-26">
                  <div className="group-7">
                    <div className="overlap-9">
                      <div className="icon-picture">
                        <div className="overlap-10">
                          <div className="box-3" />

                          <div className="picture">
                            <div className="overlap-group-5">
                              <div className="body-3" />

                              <div className="shape-3" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <img
                        className="vector-3"
                        alt="Vector"
                        src="../../../assets/img/vector.svg"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-wrapper-31">AI一键填报</div>
              </div>
            </div>

            {/* <Tabbar /> */}
          </div>

          {/* <div className="rectangle-8" /> */}
        </div>
      </div>
    </div>
  );
}
}