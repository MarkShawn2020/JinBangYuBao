/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

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
  color: string;
}

export const IconPencil = ({
  className,
  overlapClassName,
  boxClassName,
  pencilClassName,
  overlapGroupClassName,
  bodyClassName,
  shapeClassName,
  shape = "../../../assets/img/shape-1.svg",
  shapeClassNameOverride,
  bodyClassNameOverride,
  body = "../../../assets/img/body-1.svg",
  color = "color-#ff5020",
}: Props): JSX.Element => {
  return (
    <div className={`icon-pencil ${className}`}>
      <div className={`overlap-4 ${overlapClassName}`}>
        <div className={`box ${boxClassName}`} />

        <div className={`pencil ${pencilClassName}`}>
          <div className={`overlap-group-3 ${overlapGroupClassName}`}>
            <div className={`body ${bodyClassName}`} />

            <img
              className={`shape ${shapeClassName}`}
              alt="Shape"
              src={shape}
            />

            <div className={`shape-2 ${shapeClassNameOverride}`} />

            <img
              className={`body-2 ${bodyClassNameOverride}`}
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
  color: PropTypes.string,
};
