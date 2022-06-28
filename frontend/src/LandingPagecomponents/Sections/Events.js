import React from 'react';
import Images from '../Images';
import Circle from '../Circle';
import TextContent from '../TextContent';
import { Fade } from 'react-awesome-reveal';
import enterinterview from '../photos/EnterInterview.jpg';
const Events = () => {
  return (
    <section className="feature_section home_section8 bg_1" id="events">
      <div className="custom_container">
        <div className="row">
          <div className="col-md-7 my-auto">
            <Fade direction="left" triggerOnce="true">
              <TextContent
                title="Applicant Enters The Interview"
                desc="After applicant enters the invitation code he/she can enter the interview and answer questons one by one. "
              >
                <Circle num="23" />
              </TextContent>
            </Fade>
          </div>
          <div className="col-md-5 text-center">
            <div className="app_img">
              <Circle num="240" />
              <Circle num="46" />
              <Circle num="50" />
              <Images src={enterinterview} classes="feature_model" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
