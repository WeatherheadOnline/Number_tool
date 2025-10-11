import '../css/Header.css';
import AddARecordBtn from "./AddARecordBtn";

const Header = () => {
    return (
        <header className="App-header">
            <h1>Numerology Village</h1>
            <AddARecordBtn mobileOrDesktop="desktop" />
        </header>
    )
};

export default Header;