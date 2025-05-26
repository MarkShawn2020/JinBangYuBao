/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface Props {
  className: any;
  overlapClassName: any;
  boxClassName: any;
  pencilClassName: any;
  overlapGroupClassName: any;
  bodyClassName: any;
  shapeClassName: any;
  shape: string;
  shapeClassNameOverride: any;
  bodyClassNameOverride: any;
  body: string;
}

export const IconPencil = ({
  className,
  overlapClassName,
  boxClassName,
  pencilClassName,
  overlapGroupClassName,
  bodyClassName,
  shapeClassName,
  shape = "/img/shape-1.svg",
  shapeClassNameOverride,
  bodyClassNameOverride,
  body = "/img/body-1.svg",
}: Props): JSX.Element => {
  return (
    <div className={`w-[184px] h-[184px] ${className}`}>
      <div
        className={`relative h-[184px] rounded-[47.41px] ${overlapClassName}`}
      >
        <div
          className={`absolute w-[184px] h-[184px] top-0 left-0 bg-white rounded-[47.41px] rotate-[0.12deg] shadow-[8.05px_24.15px_89.45px_-11.63px_#15334f1a] ${boxClassName}`}
        />

        <div
          className={`absolute w-[147px] h-[147px] top-[18px] left-[18px] ${pencilClassName}`}
        >
          <div
            className={`relative w-[98px] h-[104px] top-3.5 left-[31px] ${overlapGroupClassName}`}
          >
            <div
              className={`absolute w-[41px] h-12 top-2 left-[46px] rounded-[13.06px] rotate-[42.73deg] [background:linear-gradient(109deg,rgba(145,127,251,1)_0%,rgba(63,45,175,1)_100%)] ${bodyClassName}`}
            />

            <img
              className={`absolute w-[78px] h-[81px] top-[18px] left-1 ${shapeClassName}`}
              alt="Shape"
              src={shape}
            />

            <div
              className={`absolute w-7 h-[7px] top-[33px] left-12 rounded-[97.97px] border-[none] rotate-[-137.27deg] backdrop-blur-[13.06px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(13.06px)_brightness(100%)] [background:linear-gradient(270deg,rgba(252,253,254,0.9)_0%,rgba(252,253,254,0)_100%)] ${shapeClassNameOverride}`}
            />

            <img
              className={`absolute w-[22px] h-[22px] top-[82px] left-0 ${bodyClassNameOverride}`}
              alt="Body"
              src={body}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

IconPencil.propTypes = {
  shape: PropTypes.string,
  body: PropTypes.string,
};
