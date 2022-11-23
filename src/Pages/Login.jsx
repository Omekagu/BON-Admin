import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <img src="./image/logo.png" alt="logo" className="login__img" />
        <h3 className="login__head">Admin Login</h3>
        <form action="" className="login__form">
          <Input placeholder="email address" />
          <Input placeholder="password" />
        </form>
        <p className="login__forgot-text">forgot password?</p>
        <Link to="/dashboard">
          <Button text="Login" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
