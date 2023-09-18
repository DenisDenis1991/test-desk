import './style.scss';
import {useDispatch} from 'react-redux'
import { setOpenModal, setCurrentId, deleteCard, setDragCard, setDropCard } from '../../store/data.slice';
import { useState } from 'react';
import ResizableComponent from './new';

const Card = ({card}) => {
  const [currentCard, setCurrenCard] = useState(null)
  const dispatch = useDispatch();

  const handleEditCard = (id) => {
    dispatch(setCurrentId(id))
    dispatch(setOpenModal(true))
  }

  const handleDeleteCard = (id) => {
    dispatch(deleteCard(id))
    setCurrenCard(card)
  }

  const dragStartHandler = (e, card) => {
    dispatch(setDragCard(card.id))
  }

  const dragEndHandler = (e) => {
    e.target.style.background = 'blanchedalmond'
  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  const dropHandler = (e, card) => {
    e.preventDefault()
    dispatch(setDropCard(card.id))
  }

  return (
    <div className='asd'>
      <li 
      onDragStart={(e) => dragStartHandler(e, card)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop = {(e) => dropHandler(e, card)}
      draggable={true}
      className='card-list__item'
      >
        <h2>{card.title}</h2>
        <p>{card.text}</p>
        <button onClick={() => handleEditCard(card.id)}>Редактировать</button>
        <button onClick={() => {handleDeleteCard(card.id)}}>Удалить карточку</button>
      </li>
      <ResizableComponent />
    </div>
    
  )
}

export default Card;