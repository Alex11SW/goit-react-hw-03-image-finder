import { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentDidUpdate() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.handleClose();
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <span className={styles.close} onClick={this.handleClose}>
            X
          </span>
          <div className={styles["image-container"]}>{children}</div>
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
