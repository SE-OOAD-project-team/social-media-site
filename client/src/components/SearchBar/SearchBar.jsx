import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate } from 'react-router-dom';

import { server_uri } from '../../index.js';
import { join_path } from '../../api/api.js';

function SearchBar({ placeholder }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState('');

    const handleFilter = async (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const uri = join_path(server_uri, '/api/search/', searchWord);
        console.log(uri);
        const res = await fetch(uri);

        const res_json = await res.json();
        console.log(res_json);

        if (res_json.status !== 'Success' || searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(res_json.data);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    };

    const navigate = useNavigate();

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
                {/* <div>{`Data: ${filteredData}`}</div> */}
                {filteredData.length !== 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 15).map((value, i) => (
                            <Link
                                className="dataItem"
                                onClick={() => {
                                    navigate(`/profile/${value}`);
                                    navigate(0);
                                }}
                                key={i}
                                // target="_blank"
                            >
                                <p>{value}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
