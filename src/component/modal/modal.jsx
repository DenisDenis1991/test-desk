import './style.scss';
import {useDispatch, useSelector} from 'react-redux'
import { setOpenModal, setCurrentId, initCards, editCard } from '../../store/data.slice';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [inputValue, setInputValue] = useState({})
  const dispatch = useDispatch()
  const openModal = useSelector((state) => state.reducer.openModal)
  const currentId = useSelector((state) => state.reducer.currentId)
  const currentCard = useSelector((state) => state.reducer.cards[currentId-1])
  
  useEffect(() => {
    setInputValue({
      title: currentCard?.title,
      text: currentCard.text,
      id: currentCard.id
    })
  }, [currentId])

  const handleCloseModal = () => {
    dispatch(setOpenModal(false))
    dispatch(setCurrentId(null))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setOpenModal(false))
    dispatch(setCurrentId(null))
    dispatch(editCard(inputValue))
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
          {/* <label className="visually-hidden" htmlFor="email">Электронная почта</label>
          <input
            required
            className='form__input'
            name='email'
            id='email'
            placeholder='Электронная почта'
            type='email'
            value= {inputValue.email || ''}
            onChange={handleInputChange}
          />
          <label className="visually-hidden" htmlFor="address">Адрес</label>
          <input
            required
            className='form__input'
            name='address'
            id='address'
            placeholder='Адрес'
            value= {inputValue.address || ''}
            type='text'
            onChange={handleInputChange}
          /> */}
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