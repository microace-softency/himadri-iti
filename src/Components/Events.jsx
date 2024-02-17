import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  getDocs,
} from "firebase/firestore";

const EventComponent = () => {

  const [eventData, setEventData] = useState([]); // Rename to coursesData


  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "Event")
      );
      const querySnapshot = await getDocs(q);

      const event = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEventData(event);

      console.log(setEventData(event));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    let animationFrameId;
    let initialTimestamp;

    const updateScrollPosition = (timestamp) => {
      if (!initialTimestamp) {
        initialTimestamp = timestamp;
      }

      const progress = timestamp - initialTimestamp;
      const newXPosition = Math.min(progress / 40, content.scrollWidth - container.offsetWidth);

      if (container && content) {
        content.style.transform = `translateX(-${newXPosition}px)`;

        if (!hovered && newXPosition >= content.scrollWidth - container.offsetWidth - 280) {
          content.style.transform = 'translateX(0)';
          initialTimestamp = null;
        }

        if (!hovered && newXPosition < content.scrollWidth - container.offsetWidth) {
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
    <div className='event-component-container-parent'>
      <h2>Events</h2>

      <div
        className="event-component-container"
        style={{ width: '100%', height: '300px' }}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="event-component-content shadow-gray-400" ref={contentRef}>
          {/* {eventData.map((event) => ( */}
            <div className="event-item">
              <img className='event-item' src="logoIcon.png" alt='' />
            </div>
            <div className="event-item">
              <img className='event-item' src="logoIcon.png" alt='' />
            </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
