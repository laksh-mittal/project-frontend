import React from "react";

const LoginFailed = () => {
  return (
    <div className="ui form error">
      <div className="ui error message">
        <div className="header">Invalid!</div>
        <p>Incorrect email or password</p>
      </div>
    </div>
  );
};

export default LoginFailed;
