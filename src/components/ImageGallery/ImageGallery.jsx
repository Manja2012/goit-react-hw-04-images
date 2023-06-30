import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGallery.module.css'

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ galleryItems, onClick }) => {
  return (
    <div>
      <ul className={css.imageGallery}>
        {galleryItems.map(galleryItem => {
          return (
            <ImageGalleryItem
              key={galleryItem.id}
              galleryItem={galleryItem}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;