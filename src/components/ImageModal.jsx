import React from "react";
import { createPortal } from "react-dom";

function ImageModal({ ref, gallery, artName }) {
  function handleclose() {
    ref.current.close();
  }
  return createPortal(
    <dialog ref={ref} className="image-modal">
      <button className="close-btn" onClick={handleclose}>
        CLOSE
      </button>
      <img src={gallery} alt={artName} />
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default ImageModal;
