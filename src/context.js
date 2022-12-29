import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const url = ''

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  return <AppContext.Provider value='hello'>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
