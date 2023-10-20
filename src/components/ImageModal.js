import React from "react";
import { Avatar } from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const ImageModal = ({ selectedPhoto }) => {
  const formatNumber = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  return (
    <dialog id="image_card" className="modal !overflow-y-visible">
      {selectedPhoto && (
        <div
          className={`card ${
            selectedPhoto.height > selectedPhoto.width
              ? "w-[300px] lg:w-[400px]"
              : "w-[250px] sm:w-[400px] md:w-[600px] lg:w-[800px]"
          } bg-base-100 shadow-xl`}
        >
          <figure>
            <div className="relative">
              <form method="dialog">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <img
                src={selectedPhoto?.urls.regular}
                alt={selectedPhoto?.alt_description || "Unsplash Image"}
                className="rounded mb-4"
              />
              <div className="absolute left-4 bottom-8 lg:left-8">
                <a
                  className="btn btn-xs"
                  href={selectedPhoto?.links?.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShareIcon fontSize="small" /> Share
                </a>
                <div className="dropdown dropdown-top">
                  <label tabIndex={0} className="btn btn-xs ml-2">
                    <InfoOutlinedIcon fontSize="small" /> Info
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {selectedPhoto.description && (
                      <li>Description: {selectedPhoto.description}</li>
                    )}
                    {selectedPhoto.location.country && (
                      <li>Country: {selectedPhoto.location.country}</li>
                    )}
                    {selectedPhoto.location.city && (
                      <li>City: {selectedPhoto.location.city}</li>
                    )}
                    {selectedPhoto.exif.model && (
                      <li>Camera: {selectedPhoto.exif.model}</li>
                    )}
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
  );
};

export default ImageModal;
