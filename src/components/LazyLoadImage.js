// LazyLoadImage.js

import React, { useRef } from 'react';
import useLazyLoad from '../../utils/lazyLoadHelper';
import Link from 'next/link';

const LazyLoadImage = ({ imageUrl, title, subTitle, linkHref, linkText }) => {
  const divRef = useRef();
  const observer = useLazyLoad(divRef, imageUrl);

  return (
    <div
      ref={divRef}
      className="offer-banner-item style-two wow fadeInUp delay-0-2s"
      style={{
        backgroundColor: '#e0e0e0',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="content mb-0 ml-auto">
        {subTitle && <span className="sub-title">{subTitle}</span>}
        {title && <h3>{title}</h3>}
        {linkHref && linkText && (
          <Link href={linkHref}>
            <a className="theme-btn style-three">
              {linkText} <i className="fas fa-angle-double-right" />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LazyLoadImage;
