/* eslint-disable react/prop-types */
import './style.scss';
import {useDispatch} from 'react-redux'
import { setOpenModal, setCurrentId, setDeleteCard, setDragCard, setDropCard, setInsideCard } from '../../store/data.slice';
import { useState, useRef } from 'react';
import { initState } from '../../const';

const Card = ({card}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [childCard, setChildCard] = useState([])
  const [startX, setStartX] = useState(0);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  
  const handleAddInsideCard = (card) => {
    setChildCard([...childCard,{...initState}])
    dispatch(setInsideCard({...card,innerList:[{...initState, selfId:card.selfId!==undefined?card.selfId*2 : card.id*2+childCard.length, id:card.id}]}))
  }
  
  const handleDeleteCard = (card) => {
    dispatch(setDeleteCard(card))
  }

  const handleEditCard = (card) => {
    dispatch(setCurrentId(card))
    dispatch(setOpenModal(true))
  }

  const dragStartHandler = (e, card) => {
    e.currentTarget.classList.add('drag');
    if (card.selfId === Number(e.currentTarget.id)) {
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
  }
  const dropHandler = (e, card) => {
    e.target.classList.remove('drag');
    e.preventDefault()

    if (card.selfId === Number(e.currentTarget.id)) {

      e.stopPropagation()
      dispatch(setDropCard(card))
    } else {

      dispatch(setDropCard(card))
    }
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

  const initCards = (card) => {
    const cardList = [];
    card.innerList.forEach((el,index) => {
      cardList.push(<Card key={index} card={el} />)
    })
    return cardList
  }

  return (
    
    <div 
      ref={componentRef}
      onDragStart={(e) => dragStartHandler(e, card)}
      onDragLeave={(e) => dragEndHandler(e, card)}
      onDragEnd={(e) => dragEndHandler(e, card)}
      onDragOver={(e) => dragOverHandler(e, card)}
      onDrop = {(e) => dropHandler(e, card)}
      draggable={true}
      className='card-list__item'
      id={card.selfId||card.id}
    >
      <h2 className='card-list__heading'>{card.title}</h2>
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
      <div className='card-list__inside-box'>
        {initCards(card)}
      </div>
    </div> 
  )
}

export default Card;