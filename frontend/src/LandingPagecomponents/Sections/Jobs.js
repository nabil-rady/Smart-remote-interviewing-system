import React from 'react';
import Images from '../Images';
import Circle from '../Circle';
import Triangle from '../Triangle';
import TextContent from '../TextContent';
import { Fade } from 'react-awesome-reveal';
import evaluate from '../photos/Evaluate.jpg';
const Jobs = () => {
  return (
    <section className="feature_section home_section5" id="jobs">
      <div className="custom_container">
        <div className="row">
          <div className="col-md-7 order-md-2 my-auto">
            <Fade direction="right" triggerOnce="true">
              <TextContent
                title="Manually Evaluate Applicants Who Have Taken The Interview"
                desc="HR can view the result of evaluating applicants and give a manuall evaluation based on the interview recorded videos"
              >
                <Circle num="46" />
              </TextContent>
            </Fade>
          </div>
          <div className="col-md-5 order-md-1">
            <div className="app_img">
              <Circle num="24" />
              <div className="svg10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="400.331"
                  height="386.904"
                  viewBox="0 0 400.331 386.904"
                >
                  <defs></defs>
                  <path
                    className="svg10"
                    d="M8462.153,3828.512c-32.819-85.028,54.733-315.462,170.147-196.827s176.1,164.472,94,202.219S8494.974,3913.54,8462.153,3828.512Z"
                    transform="translate(9577.251 -220.791) rotate(154)"
                  ></path>
                </svg>
              </div>
              <Images src={evaluate} classes="feature_model" />
              <Circle num="240" />
            </div>
          </div>
        </div>
      </div>
      <Triangle />
    </section>
  );
};

export default Jobs;
