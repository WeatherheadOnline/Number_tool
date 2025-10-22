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
            <div className="sort-filter-wrapper">
                <div>
                    <label htmlFor="sortOptions">Sort by:</label>
                    <select name="sortOptions" id="sortOptions">
                        <option value="">Please select...</option>
                        <option value="name">Name (A-Z)</option>
                        {/* <option value="name-down">Name (Z-A)</option> */}
                        <option value="ruling">Ruling number</option>
                        {/* <option value="ruling-down">Ruling number &#8681; descending </option> */}
                        <option value="day">Day number</option>
                        {/* <option value="day-down">Day number &#8681; descending </option> */}
                        <option value="expression">Expression number</option>
                        {/* <option value="expr-down">Expression number &#8681; descending </option> */}
                        <option value="soul">Soul number</option>
                        {/* <option value="soul-down">Soul number &#8681; descending </option> */}
                    </select>
                    <select name="sortDirection" id="sortDirection">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <button onClick={localSorter}>Sort</button>
                </div>
                {/* <div>
                    <label htmlFor="filter">Filter:</label>
                    
                </div> */}

                {/* https://www.geeksforgeeks.org/javascript/how-to-get-selected-value-in-dropdown-list-using-javascript/ */}
            </div>
        </header>
    )
};

export default Header;