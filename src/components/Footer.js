import ExternalLink from './ExternalLink';
import '../css/Footer.css';

const Footer = () => {

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

            <p className="cursor-pointer faux-link" onClick={appearify}>About</p>

            <ExternalLink url="https://www.weatherheadonline.com">
                &copy; Weatherhead Online 2024
            </ExternalLink>

            <div className="logo-110"></div>

        </footer>
    );
};

export default Footer;