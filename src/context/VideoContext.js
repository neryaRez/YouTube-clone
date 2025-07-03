import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const useVideos = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "סרטון 1",
      views: "1,000",
      thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/mqdefault.jpg"
    },
    {
      id: "2",
      title: "סרטון 2",
      views: "2,000",
      thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/mqdefault.jpg"
    },
    {
      id: "3",
      title: "סרטון 3",
      views: "3,000",
      thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg"
    }
  ]);

  const addVideo = (video) => {
    setVideos(prev => [...prev, { ...video, views: "0" }]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
export default VideoProvider;