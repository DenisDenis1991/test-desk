import { createSlice } from '@reduxjs/toolkit';
import {addInsideCard, editCard, deleteCard, changeCardId} from '../utils/utils';

const initialState = {
  cards: [],
  openModal: false,
  currentId: null,
  dragCard: null,
  addCards: null,
  insideFlag: false,
  insideCard: [],
  newCard: [],
}

export const dataCards = createSlice ({
  name: 'cards',
  initialState,
  reducers: {
    initCards: (state, action) => {
      state.cards = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
      state.curCar = action.payload;
    },
    setEditCard: (state, action) => {
      editCard(state.cards, action.payload)
    },

    setDeleteCard: (state, action) => {
      deleteCard(state.cards, action.payload)   
    },
    setDragCard: (state, action) => {
      state.dragCard = action.payload;
    },
    setDropCard: (state, action) => {
      if (state.dragCard.selfId === undefined ) {
        state.cards= state.cards.map(card =>{
          if (card.id === action.payload.id) {
            return {...card, id: state.dragCard.id}
          }
          if (card.id === state.dragCard.id) {
             return{...card, id: action.payload.id}
          }
          return card
        }).sort((a,b) => a.id - b.id)      
      }
      if(state.dragCard.selfId !== undefined) {
        changeCardId(state.dragCard, action.payload, state.cards)
      }  
    },

    addCard: (state, action) => {
      state.cards.push({...action.payload, id: state.cards.reduce((a,b) => a>b? a.id+1:b.id+1, 1) })
    },
    setInsideCard: (state, action) => {
      addInsideCard(state.cards, action.payload)
    },
  }
})

export const {initCards, setOpenModal, setCurrentId, setEditCard, setDeleteCard, setDragCard, setDropCard, addCard,  setInsideCard} = dataCards.actions;