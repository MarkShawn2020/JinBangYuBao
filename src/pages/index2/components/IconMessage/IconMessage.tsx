/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

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
  messages = "/img/messages.png",
}: Props): JSX.Element => {
  return (
    <div className={`w-[184px] h-[184px] ${className}`}>
      <div
        className={`relative h-[184px] rounded-[47.41px] ${overlapGroupClassName}`}
      >
        <div
          className={`absolute w-[184px] h-[184px] top-0 left-0 bg-white rounded-[47.41px] rotate-[0.12deg] shadow-[8.05px_24.15px_89.45px_-11.63px_#15334f1a] ${boxClassName}`}
        />

        <img
          className={`absolute w-[147px] h-[147px] top-[18px] left-[18px] ${messagesClassName}`}
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
