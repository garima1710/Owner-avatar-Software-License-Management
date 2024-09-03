import React from 'react';
import { Form, message } from 'antd';
import "../styles/style1.css";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate, useParams  } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';

const ALogin = () => {
  //form handler
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:5000/admin_route/login", values);
      //by below function brwser reload we are using this bcz the data requires to be reloaded to be updated
      // window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        console.log("Admin Login Done");
        // const id = res.data._id;
        const { token } = res.data; // Assuming the response contains the authentication token

      // Decode the token to access the payload
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
        navigate(`/UpdateEntry/${id}`);
        // history.push("/AddEntry");
      } else {
        message.error(res.data.message);
        console.log("Login Error");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  }
  return (
    <>
      {/* <h1>Hello</h1> */}
      <nav className="navbar navbar-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/login" className="nav-item nav-link">EMPLOYEE LOGIN</Link>
          </div>
        </div>
      </nav>
      <div className="form-container">
        {/* <h3 className='text-centre '>Login Form</h3> */}
        <Form onFinish={onFinishHandler}
          className="request_form">

          <h1 className='text-centre '>ADMIN LOGIN</h1>

          <Form.Item name="email">
            <input type='email' required className='input-form' placeholder='Email' />
          </Form.Item>

          <Form.Item name="password">
            <input type='password' required className='input-form' placeholder='Password' />
          </Form.Item>

          <button className="btn btn-primary" type='submit'>LOGIN</button><br />

          <p>Not a user? <Link to="/admin/register" className="m-2">
            Register here.
          </Link></p>
        </Form>
      </div>
    </>
  );
};

export default ALogin
