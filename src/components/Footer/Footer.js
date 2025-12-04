import { Link } from "react-router-dom";
import ExternalLink from '../ExternalLink/ExternalLink';
import './Footer.css';

const Footer = ({footerLink, footerLinkText}) => {

    // Make the "About" section appear when the user clicks on the "About" link in the footer 
	const appearify = () => {
        document.getElementById("about").style.display = "block";
	}

    return (
        <footer>
            <div className="greengeeks">
                <ExternalLink url="https://www.greengeeks.com">
                <img src='https://greengeeks.com/includes/images/green-tags/Green_3.png' border='0' alt='GreenGeeks eco-friendly web hosting' />
                </ExternalLink>
            </div>
            <Link to={footerLink}>
                <p className="cursor-pointer faux-link">{footerLinkText}</p>
            </Link>
            <ExternalLink url="https://www.weatherheadonline.com">
                &copy; Weatherhead Online 2024
            </ExternalLink>
            <div className="logo-110"></div>
        </footer>
    );
};

export default Footer;