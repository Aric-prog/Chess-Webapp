import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState } from 'react'
import { useAuth } from './firebase/AuthContext'
import ReactDom from 'react-dom'

const LoginModal = (props) => {

    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const { signin } = useAuth()
    // const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    const linkTemp = "#"; 


    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //         setError('')
    //         setLoading(true)
    //         await signin(emailRef.current.value, passwordRef.current.value)
    //     } catch {
    //         return setError('Failed to create an acount')
    //     }
    //     setLoading(false)

    // }
    return ReactDom.createPortal(

        <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle" onClick={props.onClose}></i>
                <div className="modal-header">
                    <h1>Login</h1>
                </div>
                {/* <form onSubmit={handleSubmit} action="" className="form-container">
                    <input type="text" ref={emailRef} placeholder="&#xF007;  Email address" required />
                    <input type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                    <a href={linkTemp} className="forgot-password">Forgot Password?</a>
                    <button disabled={loading} type="submit" value="Login">LOGIN</button>
                </form> */}
                <p>Don't have an account? <a href={linkTemp} className="modal-signup">Sign up now!</a></p>
            </div>
        </div>,
        document.getElementById('portal')
    );
}

export default LoginModal;