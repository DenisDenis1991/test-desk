import {useDispatch} from 'react-redux'
import { addNewCard, setOpenModal } from '../../store/data.slice';

const AdditionCard = () => {
  const dispatch = useDispatch();
  const handleAddCard = () => {
    dispatch(setOpenModal(true))
    dispatch(addNewCard())
  }
  return (
    <div className='add-button'>
      <button className='card-list__btn' onClick={() => handleAddCard()}>Add new card</button>
    </div>
  )
}

export default AdditionCard