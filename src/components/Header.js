import '../css/Header.css';
import AddARecordBtn from "./AddARecordBtn";

const Header = ({sorter}) => {

    const localSorter = () => {
        const e = document.getElementById("sortOptions");
        const f = document.getElementById("sortDirection");
        const option = e.value;
        const direction = f.value;
        sorter(option, direction);
    }
    return (
        <header className="App-header">

            <h1><span>Numerology </span><span>Cards</span></h1>

            <div className="header-contents">
                <div className="sort-wrapper border-radius-2">
                    <label htmlFor="sortOptions">Sort by:</label>
                    <div className="dropdowns-wrapper">
                        <select name="sortOptions" id="sortOptions">
                            <option value="">Please select...</option>
                            <option value="firstName">First name</option>
                            <option value="lastName">Last name</option>
                            <option value="ruling">Ruling number</option>
                            <option value="day">Day number</option>
                            <option value="expression">Expression number</option>
                            <option value="soul">Soul number</option>
                        </select>
                        <select name="sortDirection" id="sortDirection">
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>

                    <button onClick={localSorter}>Sort</button>

                </div>

                <AddARecordBtn mobileOrDesktop="desktop" />
            
            </div>

        </header>
    )
};

export default Header;