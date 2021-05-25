import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState } from 'react'
import { useAuth } from './firebase/AuthContext'

const LoginModal = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const linkTemp = "#"; 

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("dofunny")
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            return setError('Failed to create an acount')
        }
        setLoading(false)
        
    }

    return(
        <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle"></i>
                <div className="modal-header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit} action="" className="form-container">
                    <input type="text" ref={emailRef} placeholder="&#xF007;  Email address" required/>
                    <input type="password" ref={passwordRef} placeholder="&#xF023;  Password" required/>
                    <a href={linkTemp} className="forgot-password">Forgot Password?</a>
                    <button disabled={loading} type="submit" value="Login">LOGIN</button>
                </form>
                <p>Don't have an account? <a href={linkTemp} className="modal-signup">Sign up now!</a></p>
            </div>
        </div>
    );
}

export default LoginModal;