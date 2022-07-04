/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../components/scss/utility.scss';
import NavBar from '../components/NavBar';
import './scss/profile.scss';
import Card from '../components/Card';
import search from './SVGs/research.png';
import invite from './SVGs/invitation.png';
import check from './SVGs/check.png';
import { Link, useParams } from 'react-router-dom';
import './scss/positionpage.scss';

function PositionPage(props) {
  const params = useParams();
  const positionNameAndId = params.positionNameAndId;
  const [positionName, positionId] = positionNameAndId.split('$');

  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <p className="pName">{positionName}</p>
      <Card className="detailsCard">
        <img src={search} className="images" />
        <div className="labelContainer">
          <Link
            to={`/positiondetails/${positionName}$${positionId}`}
            className="cardLabel"
          >
            Position Details
          </Link>
        </div>
      </Card>
      <Card className="detailsCard">
        <img src={check} className="images" />
        <div className="labelContainer">
          <Link to={`/view_applicants/${positionId}`} className="cardLabel">
            Evalute Applicants
          </Link>
        </div>
      </Card>
      <Card className="detailsCard">
        <img src={invite} className="images" />
        <div className="labelContainer">
          <Link to={`/invite/${positionId}`} className="cardLabel">
            Invite Applicants
          </Link>
        </div>
      </Card>
    </>
  );
}

export default PositionPage;
