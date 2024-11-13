import React, {useState} from 'react'; 
import './Login.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function FormValidation(){
    const [showRegister, setShowRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, sepassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [errors, setErrors] = useState({});
    const validateFormInput = (event) => {}
<div className='form-box login'>
<form action = "">
    <h1>Register</h1>
    <div className='input-box'>
        <input type = "text" placeholder='Username' required/>
        <FaUserAlt className='icon'/>
    </div>
    <div className='input-box'>
        <input type = "email" placeholder='Email' required/>
        <MdEmail className='emailIcon' />


    </div>
    <div className='input-box'>
        <input type = "password" placeholder='password' required/>
        <FaLock className='icon' />

    </div>
    <div className='input-box'>
        <input type = "password" placeholder='confirm password' required/>
        <FaLock className='icon' />

    </div>
    <div className='remember-forgot'>
        <label><input type = "checkbox" />I agree to the terms & conditions</label>
        
    </div>
    <button type = "SUBMIT">Register</button>
    <div className="register-link">
        <p>Already have an account? <a href="#" onClick= {LoginRegister}>Login</a> </p>
    </div>
</form>
</div>

};


export default LoginRegister; 