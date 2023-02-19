import React from "react";

const RegisterFailed = () => {
  return (
    <div className="ui form error">
      <div className="ui error message">
        <div className="header">Invalid Action!</div>
        <p>An account with this email already exists!</p>
      </div>
    </div>
  );
};

export default RegisterFailed;
