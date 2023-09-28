import './style.scss';
import {useDispatch, useSelector} from 'react-redux'
import { setOpenModal, setCurrentId, setEditCard } from '../../store/data.slice';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [inputValue, setInputValue] = useState({})
  const dispatch = useDispatch()
  const openModal = useSelector((state) => state.reducer.openModal)
  const currentCard = useSelector((state) => state.reducer.currentId)

  useEffect(() => {
    setInputValue({
      title: currentCard.title,
      text: currentCard.text,
    })
  }, [currentCard])


  const handleCloseModal = () => {
    dispatch(setOpenModal(false))
    dispatch(setCurrentId(null))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setEditCard({...currentCard, title: inputValue.title, text: inputValue.text}))
    dispatch(setOpenModal(false))
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