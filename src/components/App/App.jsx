import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledApp } from './App.styled';
import { fetchImagesByQuery, getPerPage } from 'components/Api';
import { Loader } from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchImages = async () => {
        try {
          setLoading(true);

          const { hits, totalHits } = await fetchImagesByQuery(query, page);
          if (page === 1 && totalHits === 0) {
            toast.warn('Nothing to fetched', {
              position: 'top-right',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
          if (page === 1 && totalHits !== 0) {
            toast.success('Wow! It is so easy!', {
              position: 'top-right',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }

          setImages(prevImages => [...prevImages, ...hits]);

          showLoadMoreBtn(totalHits, hits.length);
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      };
      const showLoadMoreBtn = (totalHits, hitsLength) => {
        const perPage = getPerPage();
        const totalPages = Math.ceil(totalHits / perPage);
        if (!hitsLength || totalPages === page) {
          setShowLoadMore(false);
          return;
        }
        setShowLoadMore(true);
      };
      fetchImages();
    }
  }, [query, page]);

  const handleFormSubmit = searchQuery => {
    if (searchQuery.toLowerCase() === query.toLowerCase()) {
      toast.info(`You are already viewing images ${query}`, {
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
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const largeImageLoaded = () => {
    setLoading(false);
  };

  const handleImageClick = (largeImageUrl, tags) => {
    setLargeImage(largeImageUrl);
    setTags(tags);
    setShowModal(true);

    handleToggleModal();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} onClick={handleImageClick} />}
      {loading && <Loader />}
      {showLoadMore && !loading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <img
            src={largeImage}
            alt={tags}
            onLoad={largeImageLoaded}
            width={800}
            height={600}
          />
        </Modal>
      )}
      <ToastContainer autoClose="2000" />
    </StyledApp>
  );
};

export default App;
