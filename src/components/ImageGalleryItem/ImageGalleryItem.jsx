import React from "react";
import styles from "./image-gallery-item.module.css";

const ImageGalleryItem = ({ hits, onImageClick }) => {
  const elements = hits.map(({ id, webformatURL }) => (
    <li
      key={id}
      className={styles.item}
      onClick={() => onImageClick(webformatURL)}
    >
      <img src={webformatURL} alt="" className={styles.image} />
    </li>
  ));
  return <>{elements}</>;
};

export default ImageGalleryItem;
