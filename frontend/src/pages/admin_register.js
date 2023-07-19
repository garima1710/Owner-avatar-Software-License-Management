import React from 'react';
import {Form , message} from 'antd';
import "../styles/style1.css";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link , useNavigate} from "react-router-dom"; 
import axios from "axios";
// import Layout from "../components/employee_layout"



const ARegister = () => {
    //form handler 
    const navigate = useNavigate(); // to navigate to other pages when work of one finished
    const dispatch = useDispatch();
  
    const onFinishHandler = async(values)=>{
      try {
        dispatch(showLoading());
        const res = await axios.post("/admin_route/register",values);
        dispatch(hideLoading());
  
        if(res.data.success){
          message.success("Register Successfully!")
          navigate("/admin/login")
        } 
        else{
          message.error(res.data.message); 
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error); 
        message.error('Something went wrong')
      }
    };
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link to="/login" className="nav-item nav-link">EMPLOYEE LOGIN</Link>
                </div>
            </div>
        </nav>
      {/* <h1>Hello</h1> */}
      <div className="form-container">
        {/* <h3 className='text-centre '>Login Form</h3> */}
        <Form layout="vertical" onFinish={onFinishHandler}
        className="request_form">

          <h1 className='text-centre '>ADMIN REGISTER</h1>

            <Form.Item name="email">
              <input type='email' required className='input-form' placeholder='Email'/>
            </Form.Item>

            <Form.Item name="password">
              <input type='password' required className='input-form' placeholder='Password'/>
            </Form.Item>

            <button className="btn btn-primary" type='submit'>REGISTER</button><br />

            <p>Already a user? <Link to="/admin/login" className="m-2">
            Login.
            </Link></p>
        </Form>
      </div>
    </>
  )
}

export default ARegister

