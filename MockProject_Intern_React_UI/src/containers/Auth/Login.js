import React, { useState } from 'react';
import './Login.css';
import axios from "../../axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from "../../store/actions";
import jwt from "jsonwebtoken";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  function validateForm(data) {
    const errors = {};
    if (!data.userName) {
      errors.userName = "Tên Tài Khoản không được để trống";
    }
    if (!data.password) {
      errors.password = "Mật khẩu không được để trống";
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      userName: formData.get("userName"),
      password: formData.get("password"),
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
      try {
        const response = await axios.post('/auth/login', data);
        console.log(response);
        if (response.status === "200 OK") {
          try {
            const decoded = await jwt.verify(response.jwtToken, process.env.REACT_APP_JWT_SECRET);
            await dispatch(actions.login_success(response.jwtToken, decoded.username, decoded.authorities));
            const path = localStorage.getItem('path');
            navigate(path);
          } catch (err) {
            console.error("Token không hợp lệ hoặc đã hết hạn:", err.message);
            alert("Đăng nhập không thành công");
          }
        } else {
          alert("Thông tin đăng nhập không chính xác");
          dispatch(actions.login_failed());
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
    }

    // try {
    //   const response = await fetch("http://localhost:8080/api/user/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.message === "Successfully") {
    //     const responseData = await response.json();
    //     console.log("Response:", responseData);
    //     alert("Login Successful");
    //   } else {
    //     console.error("Error:", response.statusCode);
    //     alert("Login Failed");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("An error occurred");
    // }
  }

  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2 background"></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>Đăng Nhập vào <strong>Vungmogioi</strong></h3>
              <p className="mb-4">Đăng nhập để trải nghiệm ứng dụng.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group first mb-4">
                  <label htmlFor="userName">Tên Tài Khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your UserName"
                    name="userName"
                  />
                  {errors.userName && (
                    <span className="error">{errors.userName}</span>
                  )}
                </div>
                <div className="form-group last mb-4">
                  <label htmlFor="password">Mật Khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    name="password"
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div className="d-flex mb-2 align-items-center">
                  <span className="ml-auto">
                    <Link to='/register'>
                      Bạn chưa có tài khoản ?
                    </Link>
                  </span>
                </div>
                <input
                  type="submit"
                  value="Đăng nhập"
                  className="btn-red"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;