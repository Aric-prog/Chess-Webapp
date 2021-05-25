import { Link } from 'react-router-dom';
import ReactDom from 'react-dom'

const SignUpModal = (props) => {

    const linkTemp = "#"; 

    return ReactDom.createPortal( 
        <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle" onClick={props.onClose}></i>

                <div className="modal-header">
                    <h1>Sign Up</h1>
                </div>
                <form action="" className="form-container">
                    <input type="text" placeholder="&#xf199;  Email address" required/>
                    <input type="text" placeholder="&#xF007;  Username" required/>
                    <input type="password" placeholder="&#xF023;  Password" required/>
                    <input type="password" placeholder="&#xf01e;  Confirm Password" required/>
                    <button type="submit" value="Login">SIGN UP</button>
                </form>
                <p>Already have an account? <Link to="/login" className="modal-signup"> Sign in now!</Link></p>
                
            </div>
        </div>,
        document.getElementById('portal')
    );
}
 
export default SignUpModal;