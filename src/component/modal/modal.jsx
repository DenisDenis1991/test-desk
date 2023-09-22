/* eslint-disable react-hooks/exhaustive-deps */
import './style.scss';
import {useDispatch, useSelector} from 'react-redux'
import { setOpenModal, setCurrentId, editCard, addCard, addInsideFlag, insideCard, editInsideCard, addNewCard } from '../../store/data.slice';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [inputValue, setInputValue] = useState({})
  const dispatch = useDispatch()
  const openModal = useSelector((state) => state.reducer.openModal)
  const currentCard = useSelector((state) => state.reducer.currentId)
  const insideFlag = useSelector((state) => state.reducer.insideFlag)
  const newCard = useSelector((state) => state.reducer.newCard)
  
  useEffect(() => {
    if (!insideFlag && !newCard) {
      setInputValue({
        title: currentCard?.title,
        text: currentCard.text,
        id: currentCard.id,
      })
    }  
    
    if (insideFlag){
      setInputValue({
        title: '',
        text: '',
        id: currentCard.id,
      })
    }
    if (newCard) {
      setInputValue({
        title: '',
        text: '',
        id: '',
      })
    }
  }, [currentCard])

  const handleCloseModal = () => {
    dispatch(setOpenModal(false))
    dispatch(setCurrentId(null))
    dispatch(addInsideFlag(false))
    dispatch(addNewCard(false)) 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //редактирование карточки
    if (currentCard && !insideFlag && currentCard.insideCardId === undefined) {
      dispatch(setOpenModal(false))
      dispatch(setCurrentId(null))
      dispatch(editCard(inputValue))
      
    }
    //добавление пустой карточки
    if (newCard) {
      dispatch(setOpenModal(false))
      dispatch(addCard(inputValue))
      dispatch(addNewCard(false))                                              
    }
    // добавление внутренней карточки
    if(insideFlag) { 
      dispatch(setOpenModal(false))
      dispatch(insideCard(inputValue))
      dispatch(addInsideFlag(false))
    }
    // редактирование внутренней карточки
    if(currentCard && !insideFlag && currentCard.insideCardId !== undefined) {
      dispatch(editInsideCard({...inputValue, insideCardId: currentCard.insideCardId}))
      dispatch(setOpenModal(false))
      dispatch(setCurrentId(null))
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setInputValue({...inputValue, [name]: value});
  };

  return (
    <div className={openModal? 'modal': 'modal notActive'} onClick={() => handleCloseModal()}>
      <div className='modal__content' onClick={(e) => e.stopPropagation()}>
        <form className='modal__form form' onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="title">Заголовок</label>
          <input
            className='form__input'
            name='title'
            
            id='title'
            placeholder='Заголовок'
            value= {inputValue.title || ''}
            type='text'
            onChange={(handleInputChange)}
          />
          <label className="visually-hidden" htmlFor="text">Описание</label>
          <textarea
            className='form__input'
            id='text'
            name='text'
            rows={10}
            placeholder='Описание'
            type='text'
            value= {inputValue.text || ''}
            onChange={handleInputChange}
          />
          <div className='form__button-box'>
            <button className="form__button" type="submit">Сохранить</button>
            <button className='form__button' type='button' onClick={() => handleCloseModal()}>Отмена</button>
          </div>
        </form>
      </div>
    </div>  
  )
}

export default (Modal)