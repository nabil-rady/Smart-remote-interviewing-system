import React from 'react';
import Card from './Card';
import classes from './scss/ErrorModal.module.scss';
import err from './SVGs/cancel.png';

const ErrorModal = (props) => {
  return (
    <div className="ErrorModal">
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <img src={err} alt="error_image" className={classes.error_img} />
        <h2 className={classes.header}>{props.title}</h2>
        <p className={classes.content}>{props.message}</p>
        <footer className={classes.actions}>
          <button className={classes.close} onClick={props.onConfirm}>
            Retry
          </button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
