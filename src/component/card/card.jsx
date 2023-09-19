/* eslint-disable react/prop-types */
import './style.scss';
import {useDispatch, useSelector} from 'react-redux'
import { setOpenModal, setCurrentId, deleteCard, setDragCard, setDropCard, addInsideFlag } from '../../store/data.slice';
import { useState, useRef, useEffect } from 'react';

const Card = ({card}) => {
  const [, setCurrenCard] = useState(null)
  const [isResizing, setIsResizing] = useState(false);
  const [inside, setInside] = useState(false)
  
  const [startX, setStartX] = useState(0);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
 
  const insideCard = useSelector(state => state.reducer.insideCard)
  const insideFlag = useSelector(state => state.reducer.insideFlag)

  useEffect(() => {
    if (inside || insideFlag) {
      dispatch(addInsideFlag())
      dispatch(setOpenModal(true))
      dispatch(setCurrentId(card))
    }
  }, [inside])

  const handleEditCard = (card) => {
      dispatch(setCurrentId(card))
      dispatch(setOpenModal(true))
  }

  const handleDeleteCard = (card) => {
    dispatch(deleteCard(card))
    setCurrenCard(card)
  }


  const dragStartHandler = (e, card) => {
    dispatch(setDragCard(card.id))
    console.log(card)
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
    <li 
      id={card.insideCardId+100||card.id}
      ref={componentRef}
      onDragStart={(e) => dragStartHandler(e, card)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop = {(e) => dropHandler(e, card)}
      draggable={true}
      className='card-list__item'
    >
        <h2 className='card-list__heading'>{card?.title}</h2>
        <p className='card-list__description'>{card?.text}</p>
        <span>{card?.id}</span>
        <div className='card-list__box'>
          <button id={card.insideCardId+100||card.id} className='card-list__btn' onClick={() => handleEditCard(card)}>Edit</button>
          <button className='card-list__btn' onClick={() => {handleDeleteCard(card)}}>Delete</button>
          <button className='card-list__btn' disabled={insideFlag} onClick={()=> setInside(!inside)}>add</button>
        </div>
        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
   
        {inside && !insideFlag? insideCard.map(el=> el.id === card.id?<Card key={el.id} card={el}/>: null) : null}
    </li> 
  )
}

export default Card;