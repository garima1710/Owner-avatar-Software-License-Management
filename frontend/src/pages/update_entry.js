import React from 'react'
import { Col, Form, Input, Row, message, Button} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useState, useEffect } from "react";
import modal from "./Modal"; 
import "../styles/style_admin.css";
// import { Option } from 'antd/es/mentions';

const UpdateEntry = () => {  

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear() 
        message.success('Logout Successfully') 
        navigate('/admin/login')
      };

    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [status, setStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [employeeNames, setEmployeeNames] = useState('');

    useEffect(() => {
        const fetchEntries = async () => {
          try {
            const response = await axios.get("../admin_route/getAllEntry"); // Replace with your API endpoint to fetch entries
            setEntries(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchEntries();
    }, []);

    useEffect(() => {
        const fetchEmployeeNames = async () => {
          try {
            const entryPromises = entries.map(async (entry) => {
              const employeeResponse = await axios.get(`/admin_route/getEmployeeById/${entry.emp_id}`);
              const employee = employeeResponse.data.data; // Assuming the employee object is returned in response.data.data
    
              setEmployeeNames((prevNames) => ({
                ...prevNames,
                [entry.emp_id]: employee.name,
              }));
            });
    
            await Promise.all(entryPromises);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchEmployeeNames();
      }, [entries]);

    const handleEntrySelect = (entry) => {
        setSelectedEntry(entry);
        setStatus(entry.status);
        setRemarks(entry.upd_remarks);
    };

    const handleUpdateEntry = async () => {
        try {
          const updatedEntry = { ...selectedEntry, status, upd_remarks: remarks };
          await axios.put(`/admin_route/update_status/${selectedEntry._id}`, updatedEntry); // Replace with your API endpoint to update entry
          // Optional: Show success message or perform additional actions
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
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

      // window.location.reload();

    const statusOptions = ['Select',' Approved for Installation ', ' Approved for Local Procurement', '	Considered for Central Procurement','Closed'];
    const sortedEntries = entries.sort((a, b) => new Date(b.req_date) - new Date(a.req_date));
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    return (
        <>        
        <nav className="navbar navbar-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav" onClick={handleLogout}>  
                    <Link to = '/admin/login' className='nav-item nav-link right'>Logout</Link>
                </div>           
            </div>
        </nav>

        <div>
        {selectedEntry && (
            <modal onClose={() => setSelectedEntry(null)}>
            
            <div className="changes">
            <div className='items'>
            <h2>SELECTED ENTRY</h2>
            <p><b>Employee:</b> {selectedEntry.employeeName}</p>
            <p><b>Software:</b> {selectedEntry.software}</p>
            <p><b>Status:</b> {selectedEntry.status}</p>
            <p><b>Request Date:</b> {selectedEntry.req_date && new Date(selectedEntry.req_date).toLocaleDateString(undefined, options)}</p>
            {selectedEntry.req_remarks && <p><b>Request Remarks:</b> {selectedEntry.req_remarks}</p>}
            {selectedEntry.upd_remarks && <p><b>Update Remarks:</b> {selectedEntry.upd_remarks}</p>}
            </div>  
            <div className='items'>
            <h2>UPDATE ENTRY</h2>
            <div >
              <p><b>Update Status : </b></p>
              {/* <label><b>Update Status :</b></label><br /><br /> */}
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div><br /><br />
            <div>
              <label><b>Update Remarks : </b></label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateEntry}>Update Entry</button>
            </div>          
            </div>
          </modal>
        )}
        <table className="table">
            <thead>
            <tr>
                <th>Employee</th>
                <th>Request Date</th>
                <th>Software</th>
                <th>Request Remarks</th>
                <th>Status</th>
                <th>File Preview</th>
                <th>Update Date</th>
                <th>Update Remarks</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {sortedEntries.map((entry) => (
                <tr key={entry._id}>
                <td>{employeeNames[entry.emp_id]}</td>
                <td>{entry.req_date && new Date(entry.req_date).toLocaleDateString(undefined, options)}</td>
                <td>{entry.software}</td>
                <td>{entry.req_remarks}</td>
                <td>{entry.status}</td>
                <td>{renderFilePreview(entry)}</td>
                <td>{entry.upd_date && new Date(entry.upd_date).toLocaleDateString(undefined, options)}</td>
                <td>{entry.upd_remarks}</td>
                <td><button className="btn" onClick={() => handleEntrySelect(entry)}>Update</button></td>                
                </tr>
            ))}
            </tbody>
        </table>

        
        </div>

        </>
    )
}

export default UpdateEntry

