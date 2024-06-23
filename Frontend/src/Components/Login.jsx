import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginGraphic from '../assets/LoginGraphic.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const validateForm = (formData) => {
  let errors = {};
  if (!formData?.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  if (!formData?.password?.trim()) {
    errors.password = 'Password is required';
  }
  return errors;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) navigate('/chat');
    setFormData({
      email: '',
      password: ''
    })
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors)
        return;
      }

      const response = await axios.post('http://localhost:5000/chat-app/login', formData);
      if (response.status === 200) {
        let userInfo = response.data.userInfo;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate('/chat')
      }
    } catch (error) {
      console.error(error);
      console.error(error);
      alert(error?.response?.data?.message || 'Something went wrong! Try again');
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 d-none d-md-block">
                <img
                  src={LoginGraphic}
                  alt="Login Graphic"
                  className="img-fluid h-100 rounded-start"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title mb-4">Login</h5>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="emailInput" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={formData?.email || ""}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            ['email']: e.target.value
                          }))
                        }}
                        aria-describedby="emailHelp"
                        placeholder="Enter your email"
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    {errors?.email && <div className="invalid-feedback">{errors?.email}</div>}
                    <div className="mb-3">
                      <label htmlFor="passwordInput" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData?.password || ""}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            ['password']: e.target.value
                          }))
                        }}
                        className="form-control"
                        id="passwordInput"
                        placeholder="Enter your password"
                      />
                      {errors?.password && <div className="invalid-feedback">{errors?.password}</div>}
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">
                      Login
                    </button>
                    <p className='mt-3'>Don't have an account ? <a href='/register'>Sign up</a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;