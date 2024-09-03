import React from 'react'
import "../styles/style_add.css";
// import 'bootstrap/dist/css/bootstrap.css';
import { Col, Form, Input, Row, message, Button} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Option } from 'antd/es/mentions';

const CreateEntry = () => {  

    const { user } = useSelector((state) => state.user);
    const [employee, setEmployee] = useState(null);
    console.log("User phle ",user);
    console.log(" Employee phle ",employee);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const params = useParams();
    
    const getEmployeeInfo = async () => { 
        // console.log(params.id)
        try {
            const res = await axios.post(
                "http://localhost:5000/employee_route/getEmployeeById", 
                { eid: params.id },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                }
            );
            if (res.data.success) {

                setEmployee(res.data.data);
                // console.log(" Employee later",employee);
                console.log("res.data.data : ",res.data.data);
                // console.log(res.data.data);
            }
            } catch (error) {
            console.log(error);
        }
      };
    
      useEffect(() => {
        getEmployeeInfo();
        //eslint-disable-next-line
      }, []);

    const onFinishHandler = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "http://localhost:5000/employee_route/AddEntry",
            {
              ...values,
              emp_id: employee._id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate(`/ViewStatus/${employee._id}`);
            // navigate(`/AddEntry/${employee._id}`);
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };

    const softwareOptions = ['Select','Word','Photoshop','Reader','Chrome','PowerPoint '];

    const [selectedSoftware, setSelectedSoftware] = useState('');
    const [customSoftware, setCustomSoftware] = useState('');

    const handleSoftwareChange = (e) => {
      const { value } = e.target;
      setSelectedSoftware(value);
    
      if (value !== 'Others') {
        setCustomSoftware('');
      }
    };
    
    const handleCustomSoftwareChange = (e) => {
      const { value } = e.target;
      
      // if (selectedSoftware === 'Others') {
      //   setSelectedSoftware(value);
      // }
      setCustomSoftware(value);
    };

    const handleLogout = () =>{
        localStorage.clear() 
        message.success('Logout Successfully') 
        navigate('/login')
      };

    const handleDownloadPDF = () => {
        // Replace 'pdf-url' with the actual URL of the PDF file you want to download
        const pdfURL = 'approval.pdf';

        // Create a hidden <a> element with the download attribute
        const link = document.createElement('a');
        link.href = pdfURL;
        link.download = 'approval.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    return (
        <>        
        <nav className="navbar">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">                
                <div className="navbar-nav"> 
                <Link to={`/AddEntry/${params.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/AddEntry/${params.id}`);
                    }} className="nav-item nav-link">Request</Link>
                </div>

                <div className="navbar-nav">
                    <Link to={`/ViewStatus/${params.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/ViewStatus/${params.id}`);
                    }} className="nav-item nav-link">View Status</Link>
                </div>

                <div className="navbar-nav">
                    <Link className='nav-item nav-link' onClick={handleDownloadPDF}>Download Approval Format</Link>
                </div> 

                <div className="nav-item navbar-nav" onClick={handleLogout}> 
                    <Link to = '/login' className='nav-item nav-link'>Logout</Link>
                </div>           
            </div>
        </nav>
        <div className='form-container'>
        {employee && 
      <Form layout="vertical" onFinish={onFinishHandler} className="request_form" 
      initialValues={{
            ...employee}}>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item className='card'>
              <p>NAME : {employee.name}</p>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item className='card'>
              <p>LOCATION : {employee.location}</p>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item className='card'>
              <p>DEPARTMENT : {employee.department}</p>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="software" label="Select a software">            
            <select id="software" value={selectedSoftware === 'Others' ? customSoftware : selectedSoftware} placeholder='Select a software' allowClear onChange={handleSoftwareChange}>
                {softwareOptions.map((software, index) => (
                <option key={index} value={software}>{software}</option>
                ))}
                <option value="Others">Others</option>
            </select>
            {selectedSoftware === 'Others' && (
            <div>
                <label htmlFor="customSoftware">Enter the software name:</label>
                <input
                htmlFor="software"
                type="text"
                id="customSoftware"
                value={customSoftware}
                onChange={handleCustomSoftwareChange}
                required
                // disabled={selectedSoftware !== 'Others'}
                />
            </div>
            )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="purpose" label="Purpose">
              <Input type="text" className="form-control" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="hostname" label="Hostname">
              <Input type="text" className="form-control" />
              {/* <p>How to find hostname? <a href="#">Link</a></p> */}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="approval" label="Attach approval document">
              <Input type="file" className="form-control-file" id="exampleFormControlFile1" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="req_remarks" label="Remarks">
              <Input type="text" className="form-control" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
          <button className="btn btn-primary" type='submit'>Add Entry</button>
          <button onClick={() => navigate(`/ViewStatus/${params.id}`)}>View Submissions</button>
          </Col>
        </Row>
            
        </Form>}
        </div>

        </>
    )
}

export default CreateEntry

