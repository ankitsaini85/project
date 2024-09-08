import React, { useRef, useEffect } from "react";
import "./Videobg.css";  // Ensure this CSS file includes styles for the video

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;  // Adjust this value to control the speed (0.5 is half speed)
    }
  }, []);

  return (
    <div className="video-background-container">
      <video ref={videoRef} autoPlay loop muted className="background-video">
        <source src={`/background.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
