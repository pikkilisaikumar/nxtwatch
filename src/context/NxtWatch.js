import React from 'react'

const ThemeContext = React.createContext({
  isTheme: true,
  changeTheme: () => {},
  isSaved: true,
  savedItem: [],
  overallSaveItem: [],
  addSavedItem: () => {},
  deleteItem: () => {},
})

export default ThemeContext
