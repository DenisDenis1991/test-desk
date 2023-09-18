import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  openModal: false,
  currentId: null,
  editUser: null,
  dragCard: null
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
    },
    editCard: (state, action) => {
      state.cards = state.cards.map(card => {
        if (card.id === action.payload.id) {
          return ({...card, title: action.payload.title, text: action.payload.text})
        } else {
          return card
        }
      })
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload)
    },

    setDragCard: (state, action) => {
      state.dragCard = action.payload;
    },
    setDropCard: (state, action) => {
      state.cards= state.cards.map(card =>{
        if (card.id === action.payload) {
          return {...card, id: state.dragCard}
        }
        if (card.id === state.dragCard) {
           return{...card, id: action.payload}
        }
        return card
      }).sort((a,b) => a.id - b.id)
    }

  }
})

export const {initCards, setOpenModal, setCurrentId, editCard, deleteCard, setDragCard, setDropCard} = dataCards.actions;