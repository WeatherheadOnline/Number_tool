import ExternalLink from './ExternalLink';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="greengeeks">
                <ExternalLink url="https://www.greengeeks.com">
                <img src='https://greengeeks.com/includes/images/green-tags/Green_3.png' border='0' alt='GreenGeeks eco-friendly web hosting' />
                </ExternalLink>
            </div>
            <ExternalLink url="https://www.weatherheadonline.com">
                &copy; Weatherhead Online 2024
            </ExternalLink>
            <div className="logo-110"></div>
        </footer>
    );
};

export default Footer;