import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  openModal: false,
  currentId: null,
  editUser: null,
  dragCard: null,
  insideId: null,
  addCards: null,
  insideFlag: false,
  insideCard: [],
  newCard: false,
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
    editInsideCard: (state, action) => {
      state.insideCard = state.insideCard.map(card => {
        if (card.insideCardId === action.payload.insideCardId) {
          return ({...card, title: action.payload.title, text: action.payload.text})
        } else {
          return card
        }
      })
    },
    deleteCard: (state, action) => {    
      if (action.payload.insideCardId !==undefined) {
        state.insideCard = state.insideCard.filter(card => (card.insideCardId !== action.payload.insideCardId))
      } else {
        state.cards = state.cards.filter(card => card.id !== action.payload.id)
        state.insideCard = state.insideCard.filter(card => card.id !== action.payload.id)
      }
    },

    setDragCard: (state, action) => {
      state.dragCard = action.payload;
    },
    setDropCard: (state, action) => {
      state.cards= state.cards.map(card =>{
        if (card.id === action.payload) {
          return {...card, innerCard: true, id: state.dragCard}
        }
        if (card.id === state.dragCard) {
           return{...card, innerCard: true, id: action.payload}
        }
        return card
      }).sort((a,b) => a.id - b.id)
    },
    setDropInsideCard: (state, action) => {
      state.insideCard= state.insideCard.map(card =>{
        if (card.id === action.payload) {
          return {...card, id: state.dragCard}
        }
        if (card.id === state.dragCard) {
           return{...card, id: action.payload}
        }
        return card
      }).sort((a,b) => a.id - b.id)
    },
    addCard: (state, action) => {
      state.cards = [...state.cards,{...action.payload, innerCard: false, id: state.cards.reduce((a,b) => a>b? a.id+1:b.id+1, 1)}]
    },
    insideCard: (state, action) => {
      state.cards = state.cards.map(el => el.id === action.payload.id? {...el, innerCard: true}: {...el})
      state.insideCard = [...state.insideCard,{...action.payload, insideCardId: state.insideCard.length}]
    },
    addInsideFlag: (state) => {
      state.insideFlag = !state.insideFlag
    },
    addNewCard: (state) => {
      state.newCard = !state.newCard
    }
  }
})

export const {initCards, setOpenModal, setCurrentId, editCard, deleteCard, setDragCard, setDropCard, setDropInsideCard,addCard, addInsideFlag, insideCard, addNewCard, editInsideCard} = dataCards.actions;