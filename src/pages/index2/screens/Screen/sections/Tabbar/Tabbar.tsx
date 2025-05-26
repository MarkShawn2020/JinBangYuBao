import React from "react";

export const Tabbar = (): JSX.Element => {
  return (
    <div className="absolute w-[377px] h-[89px] top-[1133px] left-0">
      <div className="relative h-[89px]">
        <div className="absolute w-[377px] h-[89px] top-0 left-0">
          <img
            className="absolute w-[375px] h-[89px] top-0 left-0"
            alt="Union"
            src="/img/union-1.svg"
          />
        </div>

        <img
          className="absolute w-6 h-[43px] top-7 left-6"
          alt="Frame"
          src="/img/frame-1000004686.png"
        />

        <div className="flex flex-col w-11 h-[43px] items-center gap-1 absolute top-7 left-[106px]">
          <img
            className="relative w-6 h-6"
            alt="Notes"
            src="/img/notes-1.svg"
          />

          <div className="relative w-fit mb-[-0.94px] [font-family:'Inter',Helvetica] font-normal text-[#1f1c14cc] text-[11px] tracking-[0] leading-[17.0px] whitespace-nowrap">
            模拟填报
          </div>
        </div>

        <div className="absolute w-12 h-[46px] top-2.5 left-[166px]">
          <img
            className="absolute w-[101px] h-[99px] top-[-27px] left-[-27px]"
            alt="Group"
            src="/img/group-1000004252.png"
          />
        </div>

        <div className="flex flex-col w-[33px] h-[43px] items-center gap-1 absolute top-7 left-[248px]">
          <div className="relative w-6 h-6">
            <div className="relative w-[18px] h-5 top-0.5 left-[3px] bg-[url(./img/vector-1.svg)] bg-[100%_100%]">
              <img
                className="absolute w-2.5 h-[7px] top-2 left-1"
                alt="Vector"
                src="/img/vector-2.svg"
              />
            </div>
          </div>

          <div className="relative w-fit mb-[-0.94px] [font-family:'Inter',Helvetica] font-normal text-[#1f1c14cc] text-[11px] tracking-[0] leading-[17.0px] whitespace-nowrap">
            志愿表
          </div>
        </div>

        <div className="flex flex-col w-6 h-[43px] items-center gap-1 absolute top-7 left-[325px]">
          <img className="relative w-6 h-6" alt="User" src="/img/user-1.svg" />

          <div className="relative w-fit mb-[-0.94px] [font-family:'Inter',Helvetica] font-normal text-[#1f1c14cc] text-[11px] tracking-[0] leading-[17.0px] whitespace-nowrap">
            我的
          </div>
        </div>
      </div>
    </div>
  );
};
