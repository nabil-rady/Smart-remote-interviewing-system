import React from 'react';
import Card from './Card';
import classes from './scss/SuccessfullModal.module.scss';
import done from './SVGs/success.png';

const SuccessfullModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <img src={done} alt="error_image" className={classes.successful_img} />
        <h2 className={classes.headerSuccess}>{props.title}</h2>
        <footer className={classes.actions}>
          <button className={classes.closeSuccess} onClick={props.closeWindow}>
            Done
          </button>
        </footer>
      </Card>
    </div>
  );
};

export default SuccessfullModal;
