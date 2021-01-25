import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChangeSearch = e => {
    const { value } = e.target;
    this.setState({
      searchQuery: value,
    });
  };

  handleCheckSearch = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const checkedSearchQuery = searchQuery.trim().toLowerCase();

    if (
      checkedSearchQuery.length > 2 &&
      this.props.searchQuery !== checkedSearchQuery
    ) {
      this.props.submitSearch(checkedSearchQuery);
    } else {
      toast.error('Enter more letters !');
    }
  };

  render() {
    return (
      <div>
        <header className={s.Searchbar}>
          <form
            onSubmit={e => this.handleCheckSearch(e)}
            className={s.SearchForm}
          >
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>
                <ImSearch />
                Search
              </span>
            </button>

            <input
              onChange={this.handleChangeSearch}
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
