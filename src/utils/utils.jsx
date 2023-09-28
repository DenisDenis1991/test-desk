export const addInsideCard = (cards, activeCard) => {
  const targetSelfId = activeCard.innerList[0].selfId / 2;
  const targetId = activeCard.id;
  for (const card of cards) {
    if (card.id === targetId && activeCard.selfId===undefined) {
      card.innerList.push(...activeCard.innerList);
      break;
    }
    if (card.selfId === targetSelfId && card.id===targetId) {
      card.innerList.push(...activeCard.innerList);
      break;
    }
    if (card.innerList.length > 0 ) {
      addInsideCard(card.innerList, activeCard);
    }
  }
  return cards;
}


export const editCard = (cards, activeCard) => {
  for (const card of cards) {
    if (card.id===activeCard.id && activeCard.selfId===undefined) {
      card.text = activeCard.text 
      card.title = activeCard.title
    }
    if (card.id === activeCard.id && card.selfId===activeCard.selfId) {
      card.text = activeCard.text 
      card.title = activeCard.title
    }
    if (activeCard.selfId !==undefined ) {
      editCard(card.innerList, activeCard)
    }
  }
}

export const deleteCard = (cards, activeCard) => {
  console.log('delete')
  const targetId = activeCard.id;
  for (let i = 0; i < cards.length; i++) {
    const card = {...cards[i]};
    if (card.id === targetId && activeCard.selfId === undefined) {
      console.log(i)
      cards.splice(i, 1);
    }
    
    if (card.selfId === activeCard.selfId && card.id === activeCard.id && card.selfId!==undefined) {
      console.log('2')
      cards.splice(i, 1);
    }
    if (activeCard.selfId !== undefined) {
      deleteCard(card.innerList, activeCard);
    }
  }
  return cards;
}

export const changeCardId = (dragCard, dropCard, cards) => {
  if(dropCard.id === dragCard.id) return
  for (const card of cards) {
    if (card.id === dropCard.id) {
      card.innerList.push({...dragCard, id: dropCard.id})
      if (card.innerList.lenth!==0) {
        dragCradInnerList(card.innerList, dropCard.id)
      }
    }
    
    deleteCard(cards, dragCard)
  }
  return cards;
}

export const dragCradInnerList = (arr, dropId) => {
  for (const card of arr)  {
    card.id=dropId
    if(card.innerList.length!==0) {
      dragCradInnerList(card.innerList, dropId)
    }
  }
}