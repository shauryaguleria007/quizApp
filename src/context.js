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
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)

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
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
