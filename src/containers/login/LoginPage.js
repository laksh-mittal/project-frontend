import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginFailed from "./LoginFailed";
import RegisterFailed from "./RegisterFailed";
import { setLoginStatus } from "../../redux/actions/loginActions";
import { Tab } from "semantic-ui-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginWarning, setLoginWarning] = useState(false);
  const [registerWarning, setRegisterWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("login attempted!");
    await axios
      .post("https://project-backend-g96e.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.result === true) {
          dispatch(setLoginStatus(res.data));
          localStorage.setItem("token", res.data.auth);
          navigate("/");
        } else {
          setLoginWarning(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("register attempted!");
    await axios
      .post("https://project-backend-g96e.onrender.com/register", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.response === true) {
          // console.log(res.data);
          dispatch(setLoginStatus(res.data));
          localStorage.setItem("token", res.data.auth);
          navigate("/preference");
        } else {
          setRegisterWarning(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const panes = [
    {
      menuItem: "Login",
      render: () => (
        <Tab.Pane>
          <div className="ui container grid center aligned">
            <div className="eight wide column">
              <div className="ui middle aligned center aligned grid">
                <div className="column">
                  <form onSubmit={handleLoginSubmit} className="ui large form">
                    <div className="ui stacked segment">
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="user icon"></i>
                          <input
                            type="email"
                            name="email"
                            placeholder="E-mail address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="lock icon"></i>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <button
                          type="submit"
                          className="ui fluid large teal submit button"
                        >
                          Login
                        </button>
                      </div>
                      {loginWarning === true ? <LoginFailed /> : undefined}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Register",
      render: () => (
        <Tab.Pane>
          <div className="ui container grid center aligned">
            <div className="eight wide column">
              <div className="ui middle aligned center aligned grid">
                <div className="column">
                  <form
                    onSubmit={handleRegisterSubmit}
                    className="ui large form"
                  >
                    <div className="ui stacked segment">
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="user icon"></i>
                          <input
                            type="email"
                            name="email"
                            placeholder="E-mail address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="lock icon"></i>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            minLength="5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <button
                          type="submit"
                          className="ui fluid large teal submit button"
                        >
                          Register
                        </button>
                      </div>
                      {registerWarning === true ? (
                        <RegisterFailed />
                      ) : undefined}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{
        attached: true,
        tabular: true,
        style: { display: "flex", justifyContent: "center" },
      }}
      panes={panes}
    />
  );
}

export default LoginPage;
