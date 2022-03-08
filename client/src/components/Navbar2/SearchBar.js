import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import { useState } from "react";
import {TextField,Button} from '@mui/material'
import Posts from '../Posts/Posts';
import { getPostsBySearch } from '../../redux/actions/posts';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


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


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const SearchBar = () => {
    const [q, setQ] = useState("");
    const onChange = (title) => {
        console.log(title);
    }
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
  
    // const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();
  
    const searchPost = () => {
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
      } else {
        history.push('/');
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };
  
    const handleAddChip = (tag) => setTags([...tags, tag]);
  
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  
    const handleInputChange = (e) => {
        setQ( e.target.value );
        onChange( e.target.value );
    };

    return (
        <SearchBarWrappper>
            <SearchIcon onClick={searchPost} sx={{padding: "0px 2px", height: "25px", color: "#737373", paddingTop: "2px"}}/>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search for anything"/>
        </SearchBarWrappper>
    )
};

export default SearchBar;