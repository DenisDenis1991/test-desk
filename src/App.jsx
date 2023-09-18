import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardsList from './component/card-list/card-list'
import {useDispatch, useSelector} from 'react-redux'
import Modal from './component/modal/modal'
import { initCards } from './store/data.slice'
import CARDS from './const'

function App() {
  const dispatch = useDispatch()
  const openModal = useSelector((state) => state.reducer.openModal)
  useEffect(() => {
    dispatch(initCards(CARDS))
  },[])
  return (
    <>
      <CardsList />
      {openModal?
        <Modal />
        : null
      }
    </>
  )
}

export default App
