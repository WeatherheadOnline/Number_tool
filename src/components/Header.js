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
            <h1><span>Numerology </span><span>Village</span></h1>
            <AddARecordBtn mobileOrDesktop="desktop" />

            <div className="sort-wrapper">
                <label htmlFor="sortOptions">Sort by:</label>
                <select name="sortOptions" id="sortOptions">
                    <option value="">Please select...</option>
                    <option value="firstName">First name</option>
                    <option value="lastName">Last name</option>
                    <option value="ruling">Ruling number</option>
                    <option value="day">Day number</option>
                    <option value="expression">Expression number</option>
                    <option value="soul">Soul number</option>
\                    </select>
                <select name="sortDirection" id="sortDirection">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <button onClick={localSorter}>Sort</button>
            </div>

        </header>
    )
};

export default Header;