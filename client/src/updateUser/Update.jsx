import React, { useEffect, useState } from "react";
import { Link ,useNavigate,useParams} from "react-router-dom";
import "./update.css"
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = ()=>{
    const users = {
        name: "",
        email: "",
        address: "",
      };
      const [user, setUser] = useState(users);
      const navigate = useNavigate();
      const {id} = useParams();

      const inputhandler = (e)=>{
        const{name,value} = e.target;
        setUser({...user, [name]: value,})
      }

      useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        axios.get(`${apiUrl}/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    

    const submitForm = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;  // Retrieve API URL from environment variable

        try {
            const response = await axios.put(`${apiUrl}/update/user/${id}`, user);
            toast.success(response.data.message, { position: 'top-right' });
            navigate('/');
        } catch (error) {
            const errorMessage = error.response.data.message || 'An error occurred';
            toast.error(errorMessage, { position: 'top-right' });
            console.log(error);
        }
    };
    return(
        <div className="addUser">
             <Link to="/" type="button" class="btn btn-secondary">
             <i class="fa-solid fa-backward"></i> Back
             </Link>
            <h3>Update User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                     id="name"
                     value={user.name}
                     onChange={inputhandler}
                     name="name" 
                     autoComplete="off"
                     placeholder="Enter your Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                     id="email"
                     value={user.email}
                     onChange={inputhandler}
                     name="email" 
                     autoComplete="off"
                     placeholder="Enter your Email"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="name">Address</label>
                    <input type="text" 
                     id="address"
                     value={user.address}
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

export default UpdateUser;
