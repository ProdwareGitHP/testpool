import React, { useEffect } from "react";
import { EvoButton } from ".";

const SubmitButton = (props) => {
  const { onClick } = props;
  const loginpresshandler = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  useEffect(() => {
    // Add keydown event listener when the component mounts
    document.addEventListener("keydown", loginpresshandler);

    // Clean up the keydown event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", loginpresshandler);
    };
  }, [loginpresshandler]);

  return (
    <>
      <EvoButton {...props} onClick={onClick} />
    </>
  );
};

export default SubmitButton;
