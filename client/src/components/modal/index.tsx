import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

export interface ModalProps {
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const domElement = document.getElementById("modal-root");
  if (!domElement) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={`modal-container ${props.className}`}>
      <div className="close-icon" onClick={props.onClose}>
        Close X
      </div>
      <section className="modal">{props.children}</section>
    </div>,
    domElement
  );
};

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }: { children: React.ReactNode }) => (
    <React.Fragment>
      {isVisible && <Modal onClose={hide}>{children}</Modal>}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};

export default useModal;
