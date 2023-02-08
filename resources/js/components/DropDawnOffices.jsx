import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import OfficeService from "../services/OfficeService";

const DropDawnOffices = () => {
    let [selectedOption, setSelectedOption] = useState(null);
    let [options, setOptions] = useState([]);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        OfficeService.allForEmployee()
            .then((result) => {
                let options = result.map(office => {
                    return {
                        value: office.id,
                        label: `[${office.visual_id}] ${office.name}`
                    }
                });
                setOptions(options);
                // console.log(options);
            })
    }, []);

    return (
        <Select
            options={options}
            onChange={handleChange}
            value={selectedOption}
            isSearchable={true}
            isClearable={true}
        />
    );
};

export default DropDawnOffices;
