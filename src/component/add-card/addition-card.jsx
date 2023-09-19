import {useDispatch} from 'react-redux'
import { setOpenModal } from '../../store/data.slice';

const AdditionCard = () => {
  const dispatch = useDispatch();
  const handleAddCard = () => {
    dispatch(setOpenModal(true))
  }
  return (
    <li className='card-list__item'>
      <div className='card-list__box'>
        <button className='card-list__btn' onClick={() => handleAddCard()}>Add</button>
      </div>
    </li>
  )
}

export default AdditionCard