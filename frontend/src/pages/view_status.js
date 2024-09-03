import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "../styles/style_table.css";
import { showLoading, hideLoading } from "../redux/features/alertSlice";


const ViewS = () => {
  const { user } = useSelector((state) => state.user);
    const [employee, setEmployee] = useState([]);
    console.log("User phle ",user);
    console.log(" Employee phle ",employee);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const params = useParams();
    
    const getEmployeeInfo = async () => { 
        console.log("params.id : ",params.id)
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

      const [entries, setEntries] = useState([]);

      useEffect(() => {
        const fetchEntries = async () => {
          try {
            const response = await axios.post(
              "http://localhost:5000/employee_route/GetAllEntryById",
              {
                eid: params.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            // const response = await axios.post("/employee_route/GetAllEntryById"); // Replace with your API endpoint to fetch entries
            setEntries(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchEntries();
      }, []);

      const renderFilePreview = (entry) => {
        if (entry.approval) {
          const pdfURL = entry.approval;
      
          return (
            <div>
              {/* <a href="#" onClick={() => window.open(pdfURL, '_blank')}>
          View PDF
        </a> */}
              <button onClick={() => handleDownloadPDF(pdfURL)}>Download PDF</button>
            </div>
          );
        } else {
          return <p>No approval document uploaded</p>;
        }
      };

      const options = { day: 'numeric', month: 'long', year: 'numeric' };

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
    {employee && 
    
    <table className="table">
    <thead>
      <tr className="row">
        {/* <th>Emp id </th> */}
        <th>Software</th>
        <th>Purpose</th>
        <th>Hostname</th>
        <th>Status</th>
        <th>Approval Pdf</th>
        <th>Request date</th>
        <th>Request Remarks</th>
        <th>Update date</th>
        <th>Update Remarks</th>
        <br />
        {/* <th>Remarks</th> */}
      </tr>
    </thead>
    <tbody>
      {entries.map((entry) => (
        <tr className="row row-spacing" >
          {/* <td>{entry.emp_id} </td> */}
          <td>{entry.software} </td>
          <td>{entry.purpose} </td>
          <td>{entry.hostname} </td>
          <td>{entry.status} </td>
          <td><td>{renderFilePreview(entry)}</td></td>
          {/* <td>{entry.req_date}</td> */}
          <td>{entry.req_date &&new Date(entry.req_date).toLocaleDateString(undefined, options)}</td>
          <td>{entry.req_remarks}</td>
          {/* <td>{entry.upd_date}</td> */}
          <td>{entry.upd_date && new Date(entry.upd_date).toLocaleDateString(undefined, options)}</td>
          <td>{entry.upd_remarks}</td>
        </tr>
      ))}
      {/* {renderEntries()} */}
    </tbody>
  </table>

    }

    </>
  );
};

export default ViewS;