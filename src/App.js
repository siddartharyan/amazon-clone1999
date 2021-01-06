import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import { Context } from "./Context.js";
import Reducer from "./Reducer.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Forgotpassword from "./Forgotpassword.js";
import ResetLink from "./ResetLink.js";
import Resetpassword from "./Resetpassword.js";
import VerifyAccount from "./VerifyAccount.js";
import "./styles.css";

export default function App() {
  const initialState = {
    cnt: 0,
    cart: [],
    name: "",
    isloggedin: false,
    reset: false,
    verify: false,
    id: ""
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      <Router>
        <div className="app">
          <Switch>
            {state.verify ? (
              <Route exact path="/verify">
                <VerifyAccount />
              </Route>
            ) : (
              <Redirect to="/signup" />
            )}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/checkout">
              {state.isloggedin ? (
                <>
                  <Header />
                  <Checkout />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/forgotpassword">
              <Forgotpassword />
            </Route>

            {state.reset ? (
              <Route exact path="/resetpassword">
                <Resetpassword />
              </Route>
            ) : (
              <Redirect to="/login" />
            )}

            {state.reset ? (
              <Route exact path="/reset">
                <ResetLink />
              </Route>
            ) : (
              <Redirect to="/login" />
            )}
            <Route exact path="/">
              {state.isloggedin ? (
                <>
                  <Header />
                  <Home />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}
