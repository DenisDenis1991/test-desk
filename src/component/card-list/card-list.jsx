import './style.scss'
import Card from "../card/card"
import {useSelector} from 'react-redux'
import AdditionCard from '../add-card/addition-card'

const CardsList = () => {
  const cardsList = useSelector((state) => state.reducer.cards)
  return (
    <ul className="card-list"> 
      {cardsList.map((card) => {return (<Card card={card} key={card.id} />)})}
      {
        cardsList.length<12 ? <AdditionCard /> : null
      }
      
    </ul>
  )
}

export default CardsList