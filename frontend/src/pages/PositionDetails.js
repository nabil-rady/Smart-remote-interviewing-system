import React, { useEffect, useState, useRef } from 'react';
import Details from '../components/Details';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import NavBar from '../components/NavBar';
const PositionDetails = () => {
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  let position = {
    positionName: 'wmbabl;;fbmlfb',
    expiryDate: '2022-02-05T23:00:05.955Z',
    questions: [
      {
        statement:
          "V;mv;mv;'M;BM'M, LVML;mav adlma;lvmmv cgml;rsb; ael;kbglsb ldfbl",
        timeToThink: 5,
        timeToAnswer: 4,
        keywords: [
          'bmasfmb;la',
          'lvmalsmm;sv',
          "lndvlsb;vljlv'",
          'knvkashlbv',
          'dsjljljbv',
        ],
      },
      {
        statement:
          "ksnvlnlavnl;aLVKldv;lv'dva lefcl;av;lKADV LDFL;CAV;ADV L;SDVL;AVDK;v ldfl;avl; LADVL;MLA;V",
        timeToThink: 3,
        timeToAnswer: 2,
        keywords: [
          'bmasfmb;la',
          'lvmalsmm;sv',
          "lndvlsb;vljlv'",
          'knvkashlbv',
          'dsjljljbv',
        ],
      },
      {
        statement:
          'lbmfmas;m ; lbsml;smbmwfm llmdglmsrlbmm lmfbmlrbmlm ml;ermlm l;erml;reljgjrbv fdkvmleb',
        timeToThink: 10,
        timeToAnswer: 7,
        keywords: [
          'bmasfmb;la',
          'lvmalsmm;sv',
          "lndvlsb;vljlv'",
          'knvkashlbv',
          'dsjljljbv',
        ],
      },
    ],
  };
  return (
    <>
      {verificationCard && (
        <EmailVerification verificationHandler={cardClickHandler} />
      )}
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
      <Details position={position} />
    </>
  );
};
export default PositionDetails;
