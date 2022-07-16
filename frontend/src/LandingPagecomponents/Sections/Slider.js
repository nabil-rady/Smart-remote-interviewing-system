import React from 'react';
import Slider from 'react-slick';
import Images from '../Images';
import dashboard from '../photos/Dashboard.jpg';
import invite from '../photos/Invite.jpg';
import enterinterview from '../photos/EnterInterview.jpg';
import takeinterview from '../photos/TakeInterview.jpg';
import evaluate from '../photos/Evaluate.png';
import notification from '../photos/Notifications.jpg';
import details from '../photos/details.png';
const Sliders = () => {
  const settings = {
    className: '',
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    speed: 2000,
    // autoplaySpeed: 1000,
  };
  return (
    <section
      className="feature_section home_section6"
      style={{ marginTop: '2rem' }}
    >
      <Slider {...settings} className="slick">
        <Images src={dashboard} classes="feature_model" />
        <Images src={invite} classes="feature_model" />
        <Images src={details} classes="feature_model" />
        <Images src={evaluate} classes="feature_model" />
        <Images src={notification} classes="feature_model" />
        <Images src={takeinterview} classes="feature_model" />
        <Images src={enterinterview} classes="feature_model" />
      </Slider>
    </section>
  );
};
export default Sliders;
