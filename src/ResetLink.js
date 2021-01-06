import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Axios } from "./Axios.js";
import "./resetlink.css";
function ResetLink() {
  const [otp, setOtp] = useState("");
  const history = useHistory();
  function handleClick() {
    if (otp === "") {
      alert("please enter a valid otp");
      setOtp("");
      return;
    }
    async function validate() {
      try {
        const result = await Axios.post("/reset", { otp });
      } catch (err) {
        alert("invalid otp or otp has expired, please try again");
        setOtp("");
        history.push("/forgotpassword");
      }
    }
    validate();
    setOtp("");
    history.push("/resetpassword");
  }
  function handleChange(evnt) {
    setOtp(() => evnt.target.value);
  }
  return (
    <div className="reset">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt=""
        className="logo"
      />
      <div className="reset-container">
        <p>Please enter the OTP received to your email address</p>
        <input type="password" name="otp" value={otp} onChange={handleChange} />
        <button onClick={handleClick}>Verify the OTP</button>
      </div>
    </div>
  );
}
export default ResetLink;
