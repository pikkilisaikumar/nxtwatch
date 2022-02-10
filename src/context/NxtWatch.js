import React from 'react'

const ThemeContext = React.createContext({
  isTheme: true,
  changeTheme: () => {},
  isSaved: true,
  savedItem: [],
  addSavedItem: () => {},
  deleteItem: () => {},
})

export default ThemeContext
