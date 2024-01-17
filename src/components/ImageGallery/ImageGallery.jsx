import React from "react";
import styles from "../ImageGalleryItem/image-gallery-item.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ hits, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem hits={hits} onImageClick={onImageClick} />
    </ul>
  );
};

export default ImageGallery;
