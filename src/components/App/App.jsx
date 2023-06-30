import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';


export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30815916-ab82dc6f0d54ac4918d959108';
const BASE_FILTERS = 'image_type=photo&orientation=horizontal&per_page=12';

const fetchGallery = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&${BASE_FILTERS}`
  );
  const galleryItems = {
    gallery: response.data.hits.map(img => {
      const { id, webformatURL, largeImageURL, tags } = img;
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }),
  };
  return galleryItems;
};
    async function fetchImageGallery() {
      try {
        const responce = await fetchGallery(query, page);
        setGallery(prevGallery => [...prevGallery, ...responce.gallery]);
        setLoading(false);

        if (responce.gallery.length === 0) {
          toast.error('Nothing found for your request. Please, try again', {
            theme: 'colored',
          });
        }
      } catch (error) {
        setError('Something went wrong, please, try again');
      } finally {
        setLoading(false);
      }
    }
    fetchImageGallery();
  }, [page, query]);

  const handleFormSubmit = val => {
    if (val.trim() === '') {
      toast.error('Please, enter your request');
      return;
    }
    if (val === query) {
      toast.error('Please, enter something new');
      return;
    }

    console.log(val);
    setQuery(val);
    setPage(1);
    setGallery([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
    console.log(largeImageURL);
  };
  const closeModal = () => {
    setLargeImage('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <ImageGallery galleryItems={gallery} onClick={openModal} />
      {largeImage && <Modal onClose={closeModal} largeImageURL={largeImage} />}

      {gallery.length >= 12 && <Button onClick={loadMore} />}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

