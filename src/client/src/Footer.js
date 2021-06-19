// the footer
// Footer component declared functionally
const Footer = () => {


    return ( 
        // html code
        <div className="footer-container">
            <div className="footer-content-container">
                <div>Bryan Putra</div>
                <a className="fab fa-linkedin" href="https://linkedin.com/"></a>
                <a className="fab fa-github" href="https://github.com/"></a>
                <a className="fab fa-instagram" href="https://instagram.com/"></a>
            </div>
            <div className="footer-content-container">
                <div className>Aric Hernando</div>
                <a className="fab fa-github" href="https://github.com/Aric-prog"></a>
                <p>© 2021 Chess WebApp Group 2.</p>
            </div>
            <div className="footer-content-container">
                <div className>Jocelyn Thiojaya</div>
                <a className="fab fa-linkedin" href="https://linkedin.com/"></a>
                <a className="fab fa-github" href="https://github.com/"></a>
                <a className="fab fa-instagram" href="https://instagram.com/"></a>
            </div>
        </div>
    );
}

// export Footer
export default Footer;