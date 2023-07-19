import React from 'react';
import {Col, Form, Input, Row, Select, TimePicker, message} from 'antd';
import "../styles/style1.css";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link , useNavigate} from "react-router-dom"; 
import axios from "axios";
// import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
import { Option } from "antd/es/mentions";
// import Layout from "../components/employee_layout"



const ERegister = () => {
    //form handler 
    const navigate = useNavigate(); // to navigate to other pages when work of one finished
    const dispatch = useDispatch();
  
    const onFinishHandler = async(values)=>{
      try {
        dispatch(showLoading());
        const res = await axios.post("/employee_route/register",values);
        dispatch(hideLoading());
  
        if(res.data.success){
          message.success("Register Successfully!")
          navigate("/login")
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
        <nav className="navbar navbar-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link to="/admin/login" className="nav-item nav-link">ADMIN LOGIN</Link>
                </div>
            </div>
        </nav>
      {/* <h1>Hello</h1> */}
      <div className="form-container">
        {/* <h3 className='text-centre '>Login Form</h3> */}
        <Form layout="vertical" onFinish={onFinishHandler}
        className="request_form">

          <h1 className='text-centre '>EMPLOYEE REGISTER</h1>

            <Form.Item name="name">
              <input type='text' required className='input-form' placeholder='Name'/>
            </Form.Item>

            <Form.Item name="email">
              <input type='email' required className='input-form' placeholder='Email'/>
            </Form.Item>

            <Form.Item name="password">
              <input type='password' required className='input-form' placeholder='Password'/>
            </Form.Item>

            <Form.Item name="department" className='select' rules={[{ required: true }]}>
              <Select className="form-control form-select" placeholder="Select a department" allowClear>
                <Option value="HUMAN RESOURCES C&P">HUMAN RESOURCES C&P</Option>
                <Option value="ELECTRICAL">ELECTRICAL</Option>
                <Option value="BOILER & POWER PLANT">BOILER & POWER PLANT</Option>
                <Option value="MARKETING">MARKETING</Option>
                <Option value="OPERATIONS & MAINTENANC">OPERATIONS & MAINTENANCE</Option>
                <Option value="MECHANICAL">MECHANICAL</Option>
                <Option value="INTERNAL AUDIT">INTERNAL AUDIT</Option>
              </Select>
            </Form.Item>

            <Form.Item name="location" className='select' rules={[{ required: true }]}>
              <Select className="form-control form-select" placeholder="Select a location" allowClear>
                <Option value="PATA">PATA</Option>
                <Option value="DELHI-CORPORATE">DELHI-CORPORATE</Option>
                <Option value="BENGALURU">BENGALURU</Option>
                <Option value="VIJAIPUR">VIJAIPUR</Option>
                <Option value="GORAKHPUR">GORAKHPUR</Option>
                <Option value="VARANASI">VARANASI CGD</Option>
                <Option value="NOIDA KLL">NOIDA KLL</Option>
              </Select>
            </Form.Item>

            <button className="btn btn-primary" type='submit'>REGISTER</button><br />
            
            <p>Already a user? <Link to="/login" className="m-2">
            Login.
            </Link></p>
        </Form>
      </div>
    </>
  )
}

export default ERegister

