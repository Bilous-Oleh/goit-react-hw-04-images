import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledSearchbar, StyledSearchForm } from './Searchbar.styled';
import { ReactComponent as Icon } from '../../search.svg';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter a name', {
        position: 'top-right',
        // autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={handleSubmit}>
        <button type="submit" className="searchform__button">
          <Icon width="35" height="35" />
        </button>

        <input
          className="searchform__input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
