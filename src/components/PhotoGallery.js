import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Avatar,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ShareIcon from "@mui/icons-material/Share";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const PhotoGallery = () => {
  const [data, setPhotosResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const perPage = 15;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = () => {
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
    api.photos
      .getRandom({
        count: perPage,
      })
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [page]);

  const formatNumber = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto">
        <ImageList
          variant="masonry"
          cols={isSmallScreen ? 2 : 3}
          gap={12}
          className="mt-4 col-span-3 mx-4"
        >
          {data.response.map((photo, index) => (
            <ImageListItem
              key={photo?.img}
              onClick={() => handleImageClick(photo)}
            >
              <img
                src={photo?.urls?.small}
                alt={photo?.alt_description || "Unsplash Image"}
                loading="lazy"
              />
              <ImageListItemBar
                title={photo?.user.name}
                subtitle={<span>@{photo?.user?.username}</span>}
                actionIcon={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={photo?.user.profile_image?.small}
                      alt={photo?.user.name}
                      style={{ marginRight: "8px" }}
                    />
                    <IconButton aria-label="Like" style={{ color: "white" }}>
                      <ThumbUpIcon />
                    </IconButton>
                    <span style={{ marginRight: "24px" }}>{photo?.likes}</span>
                  </div>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

        <dialog id="image_card" className="modal">
          {selectedPhoto && (
            <div
              className={`card w-[300px] ${
                selectedPhoto.height > selectedPhoto.width
                  ? "lg:w-[400px]"
                  : "lg:w-[800px]"
              } bg-base-100 shadow-xl`}
            >
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <figure>
                <div className="relative">
                  <img
                    src={selectedPhoto?.urls.regular}
                    alt={selectedPhoto?.alt_description || "Unsplash Image"}
                    className="rounded mb-4"
                  />
                  <div className="absolute left-4 bottom-8 lg:left-8">
                    <a
                      className="btn btn-xs btn-outline"
                      href={selectedPhoto?.links?.html}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIcon fontSize="small" /> Share
                    </a>
                    <div className="dropdown dropdown-bottom">
                      <label
                        tabIndex={0}
                        className="btn btn-xs btn-outline ml-2"
                      >
                        <InfoOutlinedIcon fontSize="small" /> Info
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>{selectedPhoto.description}</li>
                        <li>Country: {selectedPhoto.location.country}</li>
                        <li>City: {selectedPhoto.location.city}</li>
                        <li>Camera: {selectedPhoto.exif.model}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-8 lg:bottom-9">
                    <a
                      className="btn btn-success btn-xs normal-case"
                      href={selectedPhoto.links.download}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="hidden lg:flex">Download Image</span>
                      <span className="flex lg:hidden">
                        <DownloadOutlinedIcon fontSize="small" />
                      </span>
                    </a>
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <div className="card-title">
                  <div className="grid w-full">
                    <div className="flex">
                      <Avatar
                        src={selectedPhoto?.user.profile_image.small}
                        alt={selectedPhoto?.user.name}
                        style={{ marginRight: "8px" }}
                      />
                      <div className="flex justify-between w-full">
                        <div className="grid">
                          <span className="text-sm">
                            {selectedPhoto?.user?.name}
                          </span>
                          <span className="text-sm">
                            @{selectedPhoto?.user?.username}
                          </span>
                        </div>
                        <div className="grid">
                          {selectedPhoto?.user?.social.instagram_username && (
                            <span className="text-xs">
                              <InstagramIcon fontSize="small" />/
                              {selectedPhoto?.user?.social.instagram_username}
                            </span>
                          )}
                          {selectedPhoto?.user.social?.twitter_username && (
                            <span className="text-xs">
                              <TwitterIcon fontSize="small" />/
                              {selectedPhoto?.user.social?.twitter_username}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex text-sm mt-4">
                      <span>
                        {formatNumber(selectedPhoto?.downloads)} downloads
                      </span>
                      <span className="ml-2">
                        {formatNumber(selectedPhoto?.likes)} Likes
                      </span>
                    </div>
                  </div>
                </div>
                {selectedPhoto?.tags && (
                  <span className="font-semibold">Related Tags</span>
                )}
                <div className="card-actions justify-start">
                  {selectedPhoto?.tags?.map((item) => (
                    <div className="badge badge-outline" key={item.title}>
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </dialog>

        <div className="flex justify-center join mt-12 mb-12">
          <button className="btn" onClick={handleNext}>
            Refresh
          </button>
        </div>
      </div>
    );
  }
};

export default PhotoGallery;
