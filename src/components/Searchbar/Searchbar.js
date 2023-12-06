import { useState } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as AddIcon } from '../icons/serch.svg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmitImage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.info('Please enter the search data.');
    }
    onSubmitImage(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.search__form}>
        <button type="submit" className={css.search__button}>
          <AddIcon className={css.search__icon} />
          <span className={css.search__label}>Search</span>
        </button>

        <input
          className={css.search__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitImage: PropTypes.func.isRequired,
};

export default Searchbar;