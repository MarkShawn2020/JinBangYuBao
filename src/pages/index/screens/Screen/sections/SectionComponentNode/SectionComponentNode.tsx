import React from "react";
import { IconMessage } from "../../../../components/IconMessage";
import { IconPencil } from "../../../../components/IconPencil";
import "./style.css";

export const SectionComponentNode = (): JSX.Element => {
  return (
    <div className="section-component-node">
      <div className="frame-7">
        <div className="frame-8">
          <div className="frame-9">
            <IconPencil
              body="../../../../../assets/img/body-1-1.svg"
              overlapGroupClassName="icon-pencil-instance"
              bodyClassName="design-component-instance-node"
              className="icon-pencil-2"
              shapeClassName="design-component-instance-node"
              shape="../../../../../assets/img/shape-1-1.svg"
              color="color-#ff5020"
            />
          </div>

          <div className="text-wrapper-26">模拟填报</div>
        </div>
      </div>

      <div className="frame-10">
        <div className="frame-8">
          <IconMessage
            className="icon-message-instance"
            overlapGroupClassName="design-component-instance-node"
            boxClassName="design-component-instance-node"
            messagesClassName="design-component-instance-node"
            messages="../../../../../assets/img/messages-1.svg"
          />
          <div className="text-wrapper-26">志愿表</div>
        </div>
      </div>
    </div>
  );
};
