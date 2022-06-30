import React from 'react';
import Card from './Card';
import classes from './scss/warning.module.scss';
import warning from './SVGs/warning.png';

const WarningModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <img
          src={warning}
          alt="warning_image"
          className={classes.warning_img}
        />
        <h2 className={classes.header}>{props.title}</h2>
        <p className={classes.content}>{props.message}</p>
        <footer className={classes.actions}>
          <button
            className={classes.yesChoice}
            onClick={() => props.deletePosition(props.position)}
          >
            yes
          </button>
          <button className={classes.noChoice} onClick={props.closeWarning}>
            No
          </button>
        </footer>
      </Card>
    </div>
  );
};

export default WarningModal;
