import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { animateScroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      setStatus(Status.PENDING);
      if (!searchQuery) return;

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        if (!hits.length) {
          setLoadMore(false);
         
        } else {
          setImages((prevImages) => [...prevImages, ...hits]);
          setLoadMore(page < Math.ceil(totalHits / per_page));
          setStatus(Status.RESOLVED);
        }
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    };

    getImages();
  }, [searchQuery, page, per_page]);

  const hangleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onloadMore = () => {
    setPage((prevPage) => prevPage + 1);
    scrollToBottomButton();
  };

  const scrollToBottomButton = () => {
    animateScroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const hasMoreImages = images.length > 0 && loadMore;

  return (
    <>
      <Searchbar onSubmitImage={hangleFormSubmit} />
      {status === Status.IDLE && null}

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && (
        <p>Something happened. Please refresh the page and try again.</p>
      )}

      {status === Status.RESOLVED && (
        <>
          <ImageGallery images={images} />
          {hasMoreImages && <Button onloadMore={onloadMore} hasMoreImages={hasMoreImages} />}
        </>
      )}
    </>
  );
};

export default App;
