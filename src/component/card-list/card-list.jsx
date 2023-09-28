import './style.scss'
import Card from "../card/card"
import {useSelector} from 'react-redux'
import AdditionCard from '../add-card/addition-card'


const CardsList = () => {
  
  const cardsList = useSelector((state) => state.reducer.cards)
  return (
    <>
      {cardsList.length<12 ? <AdditionCard /> : null}
      <ul style={{'gridTemplateColumns': `repeat(${cardsList.length}, max-content)`}} className="card-list"> 
        {cardsList.map((card) => {return (<Card key={card.id} card={card} />)})}
      </ul>
    </>
  )
}

export default CardsList