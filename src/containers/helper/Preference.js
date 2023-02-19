import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginStatus } from "../../redux/actions/loginActions";

const Preference = () => {
  let navigate = useNavigate();
  const email = useSelector((state) => state.userStatus.userEmail);

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("preference save attempted!");
    const token = localStorage.getItem("token");
    await axios
      .post(
        "https://project-backend-g96e.onrender.com/preference",
        { email, brand, category },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        dispatch(
          setLoginStatus({
            result: res.data,
            email: email,
            brand: brand,
            category: category,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="ui container grid center aligned">
      <div className="eight wide column">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <form onSubmit={handleSubmit} className="ui large form">
              <h2>Select Your Preferences</h2>
              <div className="ui stacked segment">
                <div className="field">
                  <label>Brand</label>
                  <select
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="ui dropdown"
                    required
                  >
                    <option value="apple">Apple</option>
                    <option value="samsung">Samsung</option>
                    <option value="lenovo">Lenovo</option>
                    <option value="oppo">Oppo</option>
                    <option value="huawei">Huawei</option>
                    <option value="microsoft">Microsoft</option>
                  </select>
                </div>
                <div className="field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="ui dropdown"
                    required
                  >
                    <option value="home-decoration">Home</option>
                    <option value="grocery">Grocery</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptops</option>
                    <option value="fragrance">Fragrances</option>
                  </select>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="ui fluid large blue submit button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preference;
