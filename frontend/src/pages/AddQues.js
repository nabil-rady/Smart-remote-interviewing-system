import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import './scss/Add.scss';

function AddQues() {
  const [count, setCount] = useState(1);
  const sideMenu = useRef(null);
  const [cards, setCard] = useState([]);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const AddHandler = () => {
    let element = document.querySelector('.card_Question');
    let copy = element.cloneNode(true);
    setCount(count + 1);
    copy.querySelector('.Question_text').value = '';
    copy.querySelector('.read_select').value = '';
    copy.querySelector('.answer_select').value = '';
    copy.querySelector('.Question_Keywords').value = '';
    copy.querySelector('.Question_label').innerHTML = `${count}`;
    copy.id = `Q${count}`;
    setCard((cards) => [...cards, copy]);
    // let del=copy.querySelector('.delete')
    // del.id=`${count}`;
    // del.classList.add("delete")
    // copy.classList.add('card_Question');
    // let destination = document.getElementById('distination');
    // destination.appendChild(copy);
    //delBtn();
  };
  // useEffect(() => {
  //     delBtn();
  // });
  // const delBtn = () =>{
  //     let deleteBtn=document.querySelectorAll(".delete")
  //     deleteBtn.forEach((btn)=>{
  //         btn.addEventListener('click',()=>{
  //             let deletedID = btn.id;
  //             let deletedCard=document.querySelector(`#Q${deletedID}`)
  //             //deletedCard.parentNode.removeChild(deletedCard)
  //             deletedCard.style.display="none";
  //         })
  //     })
  // }

  return (
    <>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
      <Card className="label_Card">
        <h2 className="Question_label">Question {count} </h2>
        <button className="delete" id="1"></button>
      </Card>

      <Card className="card_Question" id="Q1">
        <input
          type="text"
          placeholder="Full Question"
          className="Question_text"
        />

        <div>
          <p htmlFor="Time_to_read" className="label">
            Time To Think
          </p>
          <input type="number" name="Time_to_read" className="read_select" />
        </div>

        <div>
          <p className="label">Time To Answer</p>
          <input
            type="number"
            name="Time_to_answer"
            className="answer_select"
          />
          <input
            type="text"
            placeholder="Key Words"
            className="Question_Keywords"
          />
        </div>
      </Card>
      <div id="distination">
        {cards.map((element) => (
          <li key={count}>{element}</li>
        ))}
      </div>
      <button className="add" onClick={AddHandler}>
        Add Question
      </button>
    </>
  );
}

export default AddQues;
