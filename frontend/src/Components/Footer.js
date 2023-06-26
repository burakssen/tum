import { Link } from "react-router-dom";

function Footer(){
    return (
        <footer className="container d-flex flex-column mb-3 card-footer">
            <hr/>
            <div className="footer d-flex flex-row justify-content-center align-items-center">
                <Link className="m-2 link-secondary" to="https://www.tum.de/">Technische Universität München</Link>
                <Link className="m-2 link-secondary" to="/impressum">Impressum</Link>
                <Link className="m-2 link-secondary" to="/datenschutz">Datenschutz</Link>
                <Link className="m-2 link-secondary" to="/privacy">Privacy</Link>
                <Link className="m-2 link-secondary" to="/support">Support</Link>
            </div>
        </footer>
    );
}
export default Footer;