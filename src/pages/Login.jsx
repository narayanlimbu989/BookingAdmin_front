import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Costominput from "../components/costominput";
import { api } from "../Http_service/Httpservice";
import { setAuth } from "../Store/Slices/AuthSlice";

const Login = () => {
  const [load, setLoad] = useState(false);
  const [datas, setdatas] = useState({});
  const takedata = (e) => {
    setdatas((pre) => ({
      ...pre,
      [e.target.id]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const link = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { data } = await api.post("/users/api/adminlogin", datas);
      if (data.authenticate === true) {
        dispatch(setAuth(data));
        localStorage.setItem("Admin", JSON.stringify(data));
        toast.success("login success");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };
  return (
    <div
      className="login-sec py-5 d-flex flex-column align-items-center justify-content-center"
      style={{ background: "#fea41e" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h1 className="mb-5">Booknify</h1>
        <h4>Sign In</h4>
        <form>
          <Costominput
            type="text"
            title="username"
            id="username"
            value={datas.username}
            onChange={takedata}
          />
          <Costominput
            type="password"
            title="password"
            id="password"
            value={datas.password}
            onChange={takedata}
          />

          <button onClick={login} disabled={load} className="loginbtn mt-4">
            {load ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "sign In"
            )}
          </button>
        </form>
        <h5 className="mt-3">
          Create an account?{" "}
          <span
            onClick={() => link("/signup")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Login;
