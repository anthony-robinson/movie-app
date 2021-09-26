import React, {ChangeEvent, useState} from 'react';
import {Input} from 'antd';

interface ISearchBarProps {
    onSearch: (value: string) => void
}

const { Search } = Input;

export const SearchBar  = ({ onSearch } : ISearchBarProps) => {
    const [term, setTerm] = useState('');
    const onChange = (e : ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setTerm(e.target.value);
    }

    const onSearchSubmit = (term: string) => {
        onSearch(term);
    }

    return (
        <Search placeholder="Search for a movie" 
            onChange={onChange} 
            value={term} 
            onSearch={onSearchSubmit} 
            enterButton 
        />
    )
}


