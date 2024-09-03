//here we protect routes so that user cant direct to homepage initially
//also if he once login then login and register page shouldnt approachable again

import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom' 
import { useSelector , useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

export default function AProtectedRoutes({children}){ 
    const dispatch = useDispatch() 
    const {admin} = useSelector(state => state.user)
    //get user 
    const getadmin = async()=>{
        try {
             dispatch(showLoading()) 
             const res = await axios.post("http://localhost:5000/admin_route/getAdminById",{
                token : localStorage.getItem('token')},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
             }) ;
             dispatch(hideLoading()) 
             if(res.data.success){
                dispatch(setUser(res.data.data)) 
             } 
             else{
                <Navigate to = "/admin/login"/>;  
                localStorage.clear(); 
             }
        } catch (error) { 
            dispatch(hideLoading())  
            localStorage.clear(); 
            console.log(error); 
        }
    } 
    useEffect(() =>{
        if(!admin){
            getadmin()
        }
    } , [admin , setUser()]);
    if(localStorage.getItem("token")){
        return children ; 
    }else{
        return <Navigate to="/admin/login" />;
    }
}