/* eslint-disable react/prop-types */
import './style.scss';
import {useDispatch, useSelector} from 'react-redux'
import { setOpenModal, setCurrentId, deleteCard, setDragCard, setDropCard, addInsideFlag, setDropInsideCard } from '../../store/data.slice';
import { useState, useRef } from 'react';

const Card = ({card}) => {
  const [isResizing, setIsResizing] = useState(false);
  
  const [startX, setStartX] = useState(0);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
 
  const insideCard = useSelector(state => state.reducer.insideCard)

  const handleAddInsideCard = (card) => {
    dispatch(addInsideFlag())
    dispatch(setOpenModal(true))
    dispatch(setCurrentId(card))
  }

  const handleEditCard = (card) => {
      dispatch(setCurrentId(card))
      dispatch(setOpenModal(true))
  }

  const handleDeleteCard = (card) => {
    dispatch(deleteCard(card))
  }

  const dragStartHandler = (e, card) => {
    if (card.insideCardId !== undefined) {
      e.stopPropagation()  
      dispatch(setDragCard(card))
    } else {
      dispatch(setDragCard(card))
    }
  }

  const dragEndHandler = (e) => {
    e.currentTarget.classList.remove('drag');

  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag');
  }
  const dropHandler = (e, card) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag');
    dispatch(setDropCard(card.id))
    dispatch(setDropInsideCard(card))
  }

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const newWidth = componentRef.current.offsetWidth + deltaX;
    componentRef.current.style.width = `${newWidth}px`;
    setStartX(e.clientX);
  };

  return (
    
    <div 
      ref={componentRef}
      onDragStart={(e) => dragStartHandler(e, card)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e, card)}
      onDrop = {(e) => dropHandler(e, card)}
      draggable={true}
      className='card-list__item'
    >
      <h2 className='card-list__heading'>{card?.title}</h2>
      <p className='card-list__description'>{card?.text}</p>
      <div className='card-list__box'>
        <button className='card-list__btn' onClick={()=> handleEditCard(card)}>Edit</button>
        <button className='card-list__btn' onClick={()=> handleDeleteCard(card)}>Delete</button>
        <button className='card-list__btn' onClick={()=> handleAddInsideCard(card)}>Inside</button>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      {card.innerCard? insideCard.map(el=> el.id === card.id?<div key={el.insideCardId}><Card card={el}/></div>: null) : null}
    </div> 
  )
}

export default Card;