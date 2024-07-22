import React from "react";
import "./VideoModal.css";

const VideoModal = ({ show, onClose, videoSrc, videoPoster, onEnded }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="video-modal">
      <div className="video-modal-content">
        <span className="video-modal-close" onClick={onClose}>&times;</span>
        <video
          src={videoSrc}
          poster={videoPoster}
          controls
          loading="lazy"
          controlsList="nodownload"
          onEnded={onEnded}
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
