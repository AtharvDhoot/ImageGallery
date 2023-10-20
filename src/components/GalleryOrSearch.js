import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { ImageList } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Loading from "./Loading";
import PhotoCard from "./PhotoCard";
import ImageModal from "./ImageModal";
import Pagination from "./Pagination";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const GalleryOrSearch = ({ mode, query }) => {
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const perPage = 15;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrev = () => {
    if (page > 1) {
      scrollToTop();
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setPhotos(null);
    scrollToTop();
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (photo) => {
    setSelectedPhoto(null);
    api.photos
      .get({
        photoId: photo.id,
      })
      .then((result) => {
        setSelectedPhoto(result.response);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
    document.getElementById("image_card").showModal();
  };

  useEffect(() => {
    setPhotos(null);
    if (mode === "gallery") {
      api.photos
        .getRandom({
          count: perPage,
        })
        .then((result) => {
          setPhotos(result.response);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    } else if (mode === "search") {
      api.search
        .getPhotos({ query: query, page: page, perPage: perPage })
        .then((result) => {
          setPhotos(result.response.results);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }
  }, [mode, query, page]);

  if (photos === null) {
    return <Loading />;
  } else if (photos.errors) {
    return (
      <div>
        <div>{photos.errors[0]}</div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto">
        {mode === "search" && (
          <h2 className="ml-4 text-2xl">Search Results for "{query}"</h2>
        )}
        <ImageList
          variant="masonry"
          cols={isSmallScreen ? 2 : 3}
          gap={12}
          className="mt-4 col-span-3 mx-4"
        >
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onImageClick={handleImageClick}
            />
          ))}
        </ImageList>
        <ImageModal selectedPhoto={selectedPhoto} />
        <Pagination
          mode={mode}
          page={page}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    );
  }
};

export default GalleryOrSearch;
