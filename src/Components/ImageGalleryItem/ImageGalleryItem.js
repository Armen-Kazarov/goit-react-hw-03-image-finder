import { Component } from 'react';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <>
        <li
          key={this.props.key}
          className={s.ImageGalleryItem}
          onClick={this.toggleModal}
        >
          <img
            src={this.props.smallImage}
            alt="pic"
            className="ImageGalleryItem-image"
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.bigImage} alt="big pic" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
