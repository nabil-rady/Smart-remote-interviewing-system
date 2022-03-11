import React from 'react';
import { Fade } from 'react-awesome-reveal';
const Images = ({ src, classes }) => {
  return (
    <Fade direction="down" triggerOnce="true" style={{ zIndex: '5' }}>
      <img
        className={`model wow fadeInUp ${classes}`}
        data-wow-delay=".3s"
        src={src}
        style={{
          animationName: 'fadeInUp',
          animationDelay: '0.3s',
        }}
        alt="colleges"
      />
    </Fade>
  );
};

export default Images;
