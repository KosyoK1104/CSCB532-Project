import React, {useRef, useState} from "react";
import "./SelectFilter.css";

const findValue = (data, value) => {
    const item = data.find((item) => item.value === value);
    return item ? item.name : "";
}

const SelectFilter = ({data, onSelect, value}) => {
    const [initialData, setInitialData] = useState(data);
    const [filter, setFilter] = useState(findValue(data, value));
    const [filteredData, setFilteredData] = useState(data);
    const [showOptions, setShowOptions] = useState(false);
    const selectRef = useRef(null);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        if(event.target.value === "") {
            setFilteredData(initialData);
            return;
        }
        setFilteredData(
            initialData.filter((item) => {
                    return item.name.toLowerCase().includes(event.target.value.toLowerCase())
                }
            )
        );
    };

    const handleClickOutside = (event) => {
        if(selectRef.current && !selectRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    const handleOptionClick = (item) => {
        setFilter(item.name);
        setShowOptions(false);
        onSelect(item.value);
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    return (
        <div className="select-filter" ref={selectRef}>
            <div className="select-filter-input">
                <input
                    type="text"
                    className="form-control"
                    id="selectFilter"
                    value={filter}
                    onChange={handleFilterChange}
                    onFocus={() => setShowOptions(true)}
                />
            </div>
            {showOptions && (
                <ul className="select-filter-options">
                    {filteredData.map((item) => (
                        <li
                            key={item.value}
                            className="select-filter-option"
                            onClick={() => handleOptionClick(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectFilter;
