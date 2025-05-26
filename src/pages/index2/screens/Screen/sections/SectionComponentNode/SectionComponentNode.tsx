import React from "react";
import { IconMessage } from "../../../../components/IconMessage";
import { IconPencil } from "../../../../components/IconPencil";

export const SectionComponentNode = (): JSX.Element => {
  return (
    <div className="inline-flex h-16 items-start gap-4 absolute top-[489px] left-[17px]">
      <div className="flex flex-col w-[163px] h-16 items-start gap-[6.4px] px-4 py-3 relative rounded-[10.24px] overflow-hidden shadow-[0px_6.4px_16px_#38383808] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(239,238,255,1)_100%)]">
        <div className="inline-flex items-center gap-[12.8px] relative flex-[0_0_auto]">
          <div className="relative w-[39.04px] h-[39.04px] bg-[#eeeeff] rounded-[12.8px] overflow-hidden">
            <IconPencil
              body="/img/body-1-1.svg"
              bodyClassName="h-2.5 rounded left-2.5 w-9 top-0.5"
              bodyClassNameOverride="h-5 w-5 top-18"
              boxClassName="h-10 rounded w-10"
              className="h-10 w-10"
              overlapClassName="h-10 rounded"
              overlapGroupClassName="h-22 left-7 w-21 top-3"
              pencilClassName="h-8 left-1 w-8 top-1"
              shape="/img/shape-1-1.svg"
              shapeClassName="h-17 left-px w-17 top-1"
              shapeClassNameOverride="h-px rounded left-2.5 w-1.5 top-7"
            />
          </div>

          <div className="relative w-fit [font-family:'MiSans-Regular',Helvetica] font-normal text-text-main text-sm tracking-[0] leading-[19.6px] whitespace-nowrap">
            模拟填报
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[163px] h-16 items-start gap-[6.4px] px-4 py-3 relative rounded-[10.24px] overflow-hidden shadow-[0px_6.4px_16px_#38383808] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,236,236,1)_100%)]">
        <div className="inline-flex items-center gap-[12.8px] relative flex-[0_0_auto]">
          <IconMessage
            boxClassName="h-10 rounded w-10"
            className="h-10 w-10 relative"
            messages="/img/messages-1.svg"
            messagesClassName="h-8 left-1 w-8 top-1"
            overlapGroupClassName="h-10 rounded"
          />
          <div className="relative w-fit [font-family:'MiSans-Regular',Helvetica] font-normal text-text-main text-sm tracking-[0] leading-[19.6px] whitespace-nowrap">
            志愿表
          </div>
        </div>
      </div>
    </div>
  );
};
