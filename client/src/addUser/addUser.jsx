import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./adduser.css"
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = ()=>{
    const users = {
        name: "",
        email: "",
        address: "",
      };
      const [user, setUser] = useState(users);
      const navigate = useNavigate();

      const inputhandler = (e)=>{
        const{name,value} = e.target;
        console.log(name , value)

        setUser({...user, [name]: value,})

      }
      const submitForm = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;  // Retrieve API URL from environment variable

        try {
            const response = await axios.post(`${apiUrl}/user`, user);
            toast.success(response.data.message, { position: 'top-right' });
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage, { position: 'top-right' });
        }
    };
    return(
        <div className="addUser">
             <Link to="/" type="button" class="btn btn-secondary">
             <i class="fa-solid fa-backward"></i> Back
             </Link>
            <h3>Add New User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                     id="name"
                     onChange={inputhandler}
                     name="name" 
                     autoComplete="off"
                     placeholder="Enter your Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                     id="email"
                     onChange={inputhandler}
                     name="email" 
                     autoComplete="off"
                     placeholder="Enter your Email"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="name">Address</label>
                    <input type="text" 
                     id="address"
                     onChange={inputhandler}
                     name="address" 
                     autoComplete="off"
                     placeholder="Enter your Address"/>
                </div>
                <div className="inputGroup">
                     <button type="submit" class="btn btn-primary">
                     Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUser;