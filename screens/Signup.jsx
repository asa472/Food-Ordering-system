import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

export default function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Account Created Successfully..!! You Can Login Now");   
                navigate("/login");
            } else {
                alert("Enter Valid Credential..!!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");
        }
    };  
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/modern-geometrical-wallpaper-with-round-lines_23-2148811528.jpg")', backgroundSize: 'cover',height: '100vh' }}>
        <div className='container'>
            <form onSubmit={handleSubmit}><b><br/>
            <h2><center><b> Register To FoodyWeb </b></center></h2>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder="Enter Name" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputAddress1">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress1" placeholder="Address" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
                </b>
            </form>
        </div>
        </div>
    );
}
