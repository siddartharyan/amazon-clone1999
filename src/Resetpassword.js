import React, { useState, useContext } from "react";
import { Context } from "./Context.js";
import { useHistory } from "react-router-dom";
import { Axios } from "./Axios.js";
import "./resetpassword.css";
function Resetpassword() {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [pass, setPass] = useState({ new: "", check: "" });
  function handleClick() {
    if (pass.new === "" || pass.check === "") {
      alert("please enter a valid password");
      setPass({ new: "", check: "" });
      return;
    }
    async function change() {
      try {
        let data = await Axios.post("/changepassword", pass);
      } catch (err) {
        alert("network error");
        return;
      }
    }
    change();
    setPass({ new: "", check: "" });
    alert("Password has been changed successfully");
    dispatch({ type: "reset" });
    history.push("/login");
  }

  function handleChange(evnt) {
    setPass((prev) => ({
      ...prev,
      [evnt.target.name]: evnt.target.value
    }));
  }
  return (
    <div className="reset-password">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt=""
        className="logo"
      />
      <div className="reset-password-container">
        <div className="newp">
          <label>New Password</label>
          <input
            type="password"
            name="new"
            value={pass.new}
            onChange={handleChange}
          />
        </div>
        <div className="newp">
          <label>Re Enter the Password</label>
          <input
            type="password"
            name="check"
            value={pass.check}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick}>Change the password</button>
      </div>
    </div>
  );
}
export default Resetpassword;
