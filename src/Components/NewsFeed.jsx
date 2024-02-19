import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);

  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "News"));
      const querySnapshot = await getDocs(q);

      const news = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNewsData(news);

      console.log(news);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;
    let initialTimestamp;

    const updateScrollPosition = (timestamp) => {
      if (!initialTimestamp) {
        initialTimestamp = timestamp;
      }

      const progress = timestamp - initialTimestamp;
      const newYPosition = Math.min(progress / 60, 500); // Adjust scroll speed here (10 is the speed factor).

      if (container) {
        container.scrollTop = newYPosition;

        if (!hovered && newYPosition >= 280) {
          container.scrollTop = 0; // Reset scroll position to the top when it reaches the bottom.
          initialTimestamp = null;
        }

        if (!hovered && newYPosition < 500) {
          animationFrameId = requestAnimationFrame(updateScrollPosition);
        }
      }
    };

    if (!hovered) {
      animationFrameId = requestAnimationFrame(updateScrollPosition);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="news-feed-container-parent">
      <h2 style={{display:"flex", justifyContent:"center", color:"red"}}>Notice</h2>
      <div
        className="news-feed-container"
        style={{ width: "400px", height: "500px" }}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          {/* {newsData.map((news, i) => ( */}
            <div className="news-item">
              <h4>01/02/2024</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>03/12/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>12/09/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>25/12/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>12/10/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>18/05/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>30/05/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>08/08/2023</h4>
              <p>wdfhbvi</p>
            </div>
            <div className="news-item">
              <h4>News 9</h4>
              <p>wdfhbvi</p>
            </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
