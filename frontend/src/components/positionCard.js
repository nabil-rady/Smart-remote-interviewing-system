import { Link } from 'react-router-dom';
import Card from '../components/Card';

import formatDate from '../utils/formatDate';

import delIcon from '../components/SVGs/delete.svg';

import im1 from '../solidBG/1.jpg';
import im2 from '../solidBG/2.jpg';
import im3 from '../solidBG/3.jpg';
import im4 from '../solidBG/4.jpg';
import im5 from '../solidBG/5.jpg';
import im6 from '../solidBG/6.jpg';
import im7 from '../solidBG/7.jpg';
import im8 from '../solidBG/8.jpg';
import im9 from '../solidBG/9.jpg';
import im10 from '../solidBG/10.jpg';
import im11 from '../solidBG/11.jpg';
import im12 from '../solidBG/12.jpg';
import im13 from '../solidBG/13.jpg';
import im14 from '../solidBG/14.jpg';
import im15 from '../solidBG/15.jpg';
import im16 from '../solidBG/16.jpg';
import im17 from '../solidBG/17.jpg';
import im18 from '../solidBG/18.jpg';
import im19 from '../solidBG/19.jpg';
import im20 from '../solidBG/20.jpg';
import im21 from '../solidBG/21.jpg';
import im22 from '../solidBG/22.jpg';
import im23 from '../solidBG/23.jpg';
import im24 from '../solidBG/24.jpg';
import im25 from '../solidBG/25.jpg';
import im26 from '../solidBG/26.jpg';

function PositionCard(props) {
  const backgrounds = [
    im1,
    im2,
    im3,
    im4,
    im5,
    im6,
    im7,
    im8,
    im9,
    im10,
    im11,
    im12,
    im13,
    im14,
    im15,
    im16,
    im17,
    im18,
    im19,
    im20,
    im21,
    im22,
    im23,
    im24,
    im25,
    im26,
  ];

  const renderExpired = (pos) => {
    const second = pos.expiryDate;
    if (new Date().getTime() > new Date(second).getTime()) {
      return <p className="expired">Expired</p>;
    } else {
      return <p className="available">Available</p>;
    }
  };

  if (props.position === undefined) return null;
  return (
    <Card className="positioncard">
      <img
        alt="position-background"
        src={backgrounds[Math.floor(Math.random() * 26)]}
        className="photo"
      />
      <Link
        to={`/position/${props.position.positionName}$${props.position.jobListingId}`}
        className="pos_name"
        title={props.position.name}
      >
        {props.position.positionName}
      </Link>
      <img
        alt="delete-position"
        className="deletePosition"
        id="1"
        src={delIcon}
        onClick={() => props.deletePosition(props.position)}
      />
      {renderExpired(props.position)} <br />
      <p htmlFor="expirydate" className="labels">
        Expiry Date:
      </p>
      <p name="expirydate" className="pos_expirydate">
        {formatDate(props.position.expiryDate)}
      </p>{' '}
      <br></br>
      <p htmlFor="candidatesNo" className="labels">
        Candidates:
      </p>
      <p name="candidatesNo" className="pos_CandidatesNo">
        {props.position.invitationsNumber}
      </p>{' '}
      <br></br>
      <p htmlFor="finishedinterviews" className="labels">
        Interviews:
      </p>
      <p name="finishedinterviews" className="pos_Finishedinterviews">
        {props.position.interviewsNumber}
      </p>
    </Card>
  );
}

export default PositionCard;
