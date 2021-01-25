import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = value => {
    this.setState({
      searchQuery: value,
    });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <>
        <Searchbar submitSearch={this.handleSubmit} />
        {searchQuery && <ImageGallery searchQuery={searchQuery} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
