import React from "react";
import {
  ImageListItem,
  ImageListItemBar,
  Avatar,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const PhotoCard = ({ photo, onImageClick }) => {
  return (
    <ImageListItem key={photo?.img} onClick={() => onImageClick(photo)}>
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
            <span style={{ marginRight: "24px" }} className="text-white">
              {photo?.likes}
            </span>
          </div>
        }
      />
    </ImageListItem>
  );
};

export default PhotoCard;
