import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      if (!response.ok) {
        throw new Error('Invalid response from server');
      }
      const json = await response.json()
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credential..!!")
      }
      else {
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again later.");
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div style={{ backgroundImage: 'url("https://e1.pxfuel.com/desktop-wallpaper/937/414/desktop-wallpaper-backgrounds-professional-business-backgrounds-professional-webpage.jpg")', backgroundSize: 'cover',height: '100vh' }}>
      <div className='container'>
      <form onSubmit={handleSubmit}><br/><b>
        <h2><center><b> Login To FoodyWeb </b></center></h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div><br/>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Enter Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I'm a New User</Link>
        </b>
      </form>
    </div></div>
  )
}
