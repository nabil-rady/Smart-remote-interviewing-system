import React, { useState, useRef } from 'react';
import './scss/image-slider.scss';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import './scss/Add.scss';

let count = 1;
let nums = [];
nums.push(count);
function AddQues() {
  const sideMenu = useRef(null);
  const [cards, setCard] = useState([]);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const AddHandler = () => {
    let element = document.querySelector('.card_Question');
    let copy = element.cloneNode(true);
    count++;
    nums.push(count);
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

      <Card className="card_Question" id="Q1">
        <p className="Question_label">{count}</p>
        <button className="delete" id="1">
          Delete
        </button>
        <input
          type="text"
          placeholder="Full Question"
          className="Question_text"
        />

        <div>
          <p htmlFor="Time_to_read" className="label">
            Time To Read The Question
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
