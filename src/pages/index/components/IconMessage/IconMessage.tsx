/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  overlapGroupClassName: any;
  boxClassName: any;
  messagesClassName: any;
  messages: string;
}

export const IconMessage = ({
  className,
  overlapGroupClassName,
  boxClassName,
  messagesClassName,
  messages = "../../../assets/img/messages.png",
}: Props): JSX.Element => {
  return (
    <div className={`icon-message ${className}`}>
      <div className={`overlap-group-4 ${overlapGroupClassName}`}>
        <div className={`box-2 ${boxClassName}`} />

        <img
          className={`messages ${messagesClassName}`}
          alt="Messages"
          src={messages}
        />
      </div>
    </div>
  );
};

IconMessage.propTypes = {
  messages: PropTypes.string,
};
