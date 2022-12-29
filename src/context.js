import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const url = ''

const API_ENDPOINT = 'https://opentdb.com/api.php?'
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [modal, setModal] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => {})
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      }
    } else {
    }
  }
  useEffect(() => {
    fetchQuestions(tempUrl)
  }, [])

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      }
      return index
    })
  }
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((correct) => {
        return correct + 1
      })
    }
    nextQuestion()
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setModal(false)
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        modal,
        nextQuestion,
        checkAnswer,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
