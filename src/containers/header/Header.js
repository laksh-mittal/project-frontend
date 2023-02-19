import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../redux/actions/searchActions";
import PreferenceModal from "../helper/PreferenceModal";

const Header = () => {
  const loginStatus = useSelector((state) => state.userStatus.isLoggedIn);
  const userName = useSelector((state) => state.userStatus.userEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT", payload: false });
    navigate("/login");
  };

  return (
    <div className="ui secondary teal inverted pointing small menu">
      <div className="active item">
        <a href="/">Project</a>
      </div>

      {loginStatus ? (
        <div className="right menu">
          <div className="ui item">
            <h5>Welcome {userName.split("@")[0]}</h5>
          </div>
          <div className="ui item">
            <PreferenceModal />
          </div>
          <div className="item">
            <div className="ui mini icon input">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <i className="search link icon" />
            </div>
          </div>
          <a className="ui item" onClick={handleLogout}>
            Logout
          </a>
        </div>
      ) : undefined}
    </div>
  );
};

export default Header;
