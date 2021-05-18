const LoginModal = () => {

    const linkTemp = "#";

    return (
        <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle"></i>
                <div className="modal-header">
                    <h1>Login</h1>
                </div>
                <form action="" className="form-container">
                    <input type="text" placeholder="Email address" required/>
                    <i class="fas fa-user" aria-hidden="true"></i>
                    <input type="password" placeholder="Password" required/>
                    <i class="fas fa-lock"></i>
                    <a href={linkTemp} className="forgot-password">Forgot Password?</a>
                    <button type="submit" value="Login">LOGIN</button>
                </form>
                <p>Don't have an account? <a href={linkTemp} className="modal-signup">Sign up now!</a></p>
            </div>
        </div>
    );
}

export default LoginModal;