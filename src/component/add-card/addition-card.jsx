import {useDispatch} from 'react-redux'
import { initState } from '../../const';
import { addCard } from '../../store/data.slice';

const AdditionCard = () => {
  const dispatch = useDispatch();
  const handleAddCard = () => {
    dispatch(addCard(initState))
  }
  return (
    <div className='add-button'>
      <button className='card-list__btn' onClick={() => handleAddCard()}>Add new card</button>
    </div>
  )
}

export default AdditionCard