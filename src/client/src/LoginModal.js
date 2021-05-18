import '../node_modules/font-awesome/css/font-awesome.min.css';

const LoginModal = () => {

    const linkTemp = "#"; 

    return(
        <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle"></i>
                <div className="modal-header">
                    <h1>Login</h1>
                </div>
                <form action="" className="form-container">
                    <input type="text" placeholder="&#xF007;  Email address" required/>
                    <input type="password" placeholder="&#xF023;  Password" required/>
                    <a href={linkTemp} className="forgot-password">Forgot Password?</a>
                    <button type="submit" value="Login">LOGIN</button>
                </form>
                <p>Don't have an account? <a href={linkTemp} className="modal-signup">Sign up now!</a></p>
            </div>
        </div>
    );
}

export default LoginModal;