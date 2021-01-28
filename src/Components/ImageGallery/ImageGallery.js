import { Component } from 'react';
import Spiner from '../Loader/Loader';
import apiRes from '../../services/apiService';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from '../Button/Button';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
  };

  componentDidMount = async () => {
    const { page } = this.state;

    await apiRes
      .getGalleryData(this.props.searchQuery, page)
      .then(response =>
        this.setState({
          images: response?.hits,
          isLoading: true,
        }),
      )
      .catch(error => console.log(error))
      .finally(() =>
        this.setState({
          isLoading: false,
        }),
      );
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const { page } = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({
        isLoading: true,
        images: [],
      });

      apiRes.getGalleryData(nextQuery, page).then(newImages =>
        this.setState(({ page }) => ({
          images: newImages.hits,
          page: page,
          isLoading: false,
        })),
      );
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleLoadMoreImages = () => {
    this.setState({ isLoading: true });

    return apiRes
      .getGalleryData(this.props.searchQuery, this.state.page)
      .then(newImages =>
        this.setState(({ images, page }) => ({
          images: [...images, ...newImages.hits],
          page: page + 1,
          isLoading: false,
        })),
      );
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <>
        {' '}
        {images && (
          <ul className={s.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                smallImage={image.webformatURL}
                bigImage={image.largeImageURL}
              />
            ))}
          </ul>
        )}
        {isLoading && <Spiner />}
        {images.length > 0 && (
          <LoadMoreBtn onClick={this.handleLoadMoreImages}> </LoadMoreBtn>
        )}
      </>
    );
  }
}

export default ImageGallery;
