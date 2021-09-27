import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./Search.css";
import Button from "@mui/material/Button";
import {Link, useHistory} from "react-router-dom";
import {useCallback} from "react";

const options = ['', 'Wisdom Quotes', 'Love Quotes'];


export default function Search() {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    let url = "/search/" + inputValue;
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(url), [history]);

    return (
        <div id="search-div">
            {/*<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>*/}
            {/*<div>{`inputValue: '${inputValue}'`}</div>*/}
            {/*<br />*/}
            <div id="search-search-div">
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);

                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{}}
                    freeSolo={true}
                    renderInput={(params) => <TextField {...params} label="Search"
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter') {
                                                                history.push(url)
                                                            }
                                                        }}

                    />}
                />
            </div>
            <div id="search-button"><Link to={url}><Button id="search-button" variant="contained">
                Search</Button></Link></div>
        </div>
    );
}