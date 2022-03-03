import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import { useState } from "react";

const SearchBarWrappper = styled.div`
    border: 1px solid black;
    border-radius: 25px;
    padding: 9.5px 10px;
    display: flex;
    position: relative;
    max-width: 60rem;
    width: 100%;
    margin: 1% 0%;
    background-color: #f7f8fa;
`;

const Input = styled.input`
    border: none;
    outline: none;
    flex: 1;
    background-color: inherit;
    font-size: 1.05rem;
    margin-left: 1%;
    font-weight: 400;
`;

const SearchBar = () => {
    const [q, setQ] = useState("");
    const onChange = (title) => {
        console.log(title);
    }

    const handleInputChange = (e) => {
        setQ( e.target.value );
        onChange( e.target.value );
    };

    return (
        <SearchBarWrappper>
            <SearchIcon sx={{padding: "0px 2px", height: "25px", color: "#737373", paddingTop: "2px"}}/>
            <Input value={q} onChange={handleInputChange} placeholder="Search for anything"/>
        </SearchBarWrappper>
    )
};

export default SearchBar;