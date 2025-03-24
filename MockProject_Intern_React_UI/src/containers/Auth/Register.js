import React, { useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { Link } from "react-router-dom";

function Register() {
  const [errors, setErrors] = useState({});

  function validateForm(data) {
    const errors = {};
    const REGEX_VALID_USERNAME = /^[A-Za-z][A-Za-z0-9_]{4,24}$/;
    if (!data.userName) {
      errors.userName = "Tên tài khoản không được để trống";
    }else if (!REGEX_VALID_USERNAME.test(data.userName)) {
    errors.userName = "Tên tài khoản phải bắt đầu bằng chữ cái, chỉ chứa chữ cái, số hoặc dấu gạch dưới '_', và có độ dài từ 4 đến 24 ký tự";
  }
    if (!data.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (!/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,36}$/gmu.test(data.password)) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự, tối đa 36 ký tự, bao gồm chữ cái hoa, chữ thường, chữ số và kí tự đặc biệt";
    }
    if (!data.fullName) {
      errors.fullName = "Họ tên không được để trống";
    } else if (data.fullName.length < 8 || data.fullName.length > 36) {
      errors.fullName = "Họ tên phải có ít nhất 8 ký tự và tối đa 36 ký tự";
    }
    if (!data.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email phải bao gồm ký tự '@', một tên miền hợp lệ và đuôi miền, ví dụ: example@domain.com";
    }

    if (!data.phone) {
      errors.phone = "Số điện thoại không được để trống";
    } else if (!/^0(3[2-9]|5[689]|7[06-9]|8[1-68-9]|9[0-46-9])[0-9]{7}$/.test(data.phone)) {
      errors.phone = "Số điện thoại phải bắt đầu bằng số 0 và theo định dạng nhà mạng Việt Nam, với độ dài 10 chữ số";
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      userName: formData.get("username"),
      password: formData.get("password"),
      fullName: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
      try {
        // const response = await fetch("http://localhost:8081/auth/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // });
        const response = await axios.post('/auth/register', data);
        if (response.message === "Successfully" && response.statusCode === 200) {
          alert("Đăng ký tài khoản thành công");
        } else if (response.statusCode === 400) {
          alert(response.data);
        }
        else {
          alert("Đăng ký tài khoản thất bại");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
    }
  }

  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2 background"></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3 className="last mb-4">
                Đăng Ký sử dụng <strong>Vungmogioi</strong>
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group first mb-2">
                  <label htmlFor="phone">Số Điện Thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0917832564"
                    name="phone"
                  />
                  {errors.phone && (
                    <span className="error">{errors.phone}</span>
                  )}
                </div>
                <div className="form-group last mb-2">
                  <label htmlFor="username">Tên Tài Khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="usernameA"
                    name="username"
                  />
                  {errors.userName && (
                    <span className="error">{errors.userName}</span>
                  )}
                </div>
                <div className="form-group last mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="form-group last mb-2">
                  <label htmlFor="name">Họ Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nguyễn Văn A"
                    name="name"
                  />
                  {errors.fullName && (
                    <span className="error">{errors.fullName}</span>
                  )}
                </div>
                <div className="form-group last mb-3">
                  <label htmlFor="password">Mật Khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div className="d-flex mb-2 align-items-center">
                  <span className="ml-auto">
                    <Link to='/login'>
                      Đã có tài khoản
                    </Link>
                  </span>
                </div>

                <input
                  type="submit"
                  value="Đăng ký"
                  className="btn btn-block btn-red"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;