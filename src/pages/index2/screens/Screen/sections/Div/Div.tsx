import React from "react";

export const Div = (): JSX.Element => {
  return (
    <div className="flex w-[283px] items-start gap-12 absolute top-[735px] left-[46px] overflow-x-scroll">
      <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
        <div className="flex flex-col w-[60px] h-[60px] items-start justify-center gap-2.5 p-4 relative rounded-[50px] overflow-hidden border border-solid border-transparent">
          <div className="inline-flex flex-col items-center justify-center relative flex-[0_0_auto] mt-[-5.00px] mb-[-5.00px] mr-[-10.00px]">
            <div className="relative w-[38px] h-[38px] opacity-10" />
          </div>
        </div>

        <div className="relative w-fit [font-family:'MiSans-Regular',Helvetica] font-normal text-[#1f1c14] text-sm tracking-[-0.14px] leading-5 whitespace-nowrap">
          一分一段
        </div>
      </div>

      <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
        <div className="flex w-[60px] h-[60px] items-center gap-2.5 p-[15px] relative rounded-[50px] overflow-hidden border border-solid border-transparent">
          <div className="relative w-9 h-9 mt-[-3.00px] mb-[-3.00px] mr-[-6.00px]" />
        </div>

        <div className="relative w-fit [font-family:'MiSans-Regular',Helvetica] font-normal text-[#1f1c14] text-sm tracking-[-0.14px] leading-5 whitespace-nowrap">
          省控线
        </div>
      </div>

      <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
        <div className="relative w-[60px] h-[60px] rounded-[50px] border border-solid border-transparent" />

        <div className="relative w-fit [font-family:'MiSans-Regular',Helvetica] font-normal text-[#1f1c14] text-sm tracking-[-0.14px] leading-5 whitespace-nowrap">
          录取日程
        </div>
      </div>
    </div>
  );
};
