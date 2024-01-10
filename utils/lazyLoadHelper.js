import { useEffect, useRef } from 'react';

const useLazyLoad = (targetRef, imageUrl) => {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the background image when the element is in the viewport
            targetRef.current.style.backgroundImage = `url(${imageUrl})`;
            observer.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Set your desired threshold
      }
    );

    observer.current.observe(targetRef.current);

    // Cleanup the observer on component unmount
    return () => {
      observer.current.disconnect();
    };
  }, [imageUrl, targetRef]);

  return observer;
};

export default useLazyLoad;
