import './style.scss'
import Card from "../card/card"
import {useSelector} from 'react-redux'
import ResizableComponent from '../card/new'

const CardsList = () => {
  const cardsList = useSelector((state) => state.reducer.cards)
  return (
    <ul className="card-list"> 
      {cardsList.map((card) => {return (<Card card={card} key={card.id} />)})}
    </ul>
  )
}

export default CardsList