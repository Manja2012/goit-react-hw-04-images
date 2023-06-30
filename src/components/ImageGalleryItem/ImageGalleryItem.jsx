import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ galleryItem, onClick }) => {
  return (
    <li key={galleryItem.id} className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem__image }
        src={galleryItem.webformatURL}
        alt={galleryItem.tags}
        onClick={() => onClick(galleryItem.largeImageURL)}
      ></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

// // Опис компонента <ImageGalleryItem>

// // Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.

// <li class="gallery-item">
//   <img src="" alt="" />
// </li>;