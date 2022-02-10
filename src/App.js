import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import WrapperRoute from './components/WrapperRoute'
import ThemeContext from './context/NxtWatch'
import './App.css'

class App extends Component {
  state = {isTheme: true, savedItem: [], isSaved: true}

  changeTheme = () => {
    this.setState(prevState => ({
      isTheme: !prevState.isTheme,
    }))
  }

  addSavedItem = data => {
    const {savedItem, isSaved} = this.state

    const dataispresentornot = savedItem.find(each => each.id === data.id)

    if (dataispresentornot === undefined) {
      this.setState(prevState => ({
        savedItem: [...prevState.savedItem, data],
        isSaved: !prevState.isSaved,
      }))
    } else {
      const remaingdata = savedItem.filter(eachone => eachone.id !== data.id)
      this.setState({
        savedItem: remaingdata,
        isSaved: !isSaved,
      })
    }
  }

  render() {
    const {isTheme, savedItem, isSaved} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isTheme,
          changeTheme: this.changeTheme,
          savedItem,
          addSavedItem: this.addSavedItem,
          isSaved,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <WrapperRoute exact path="/" component={Home} />
          <WrapperRoute exact path="/trending" component={Trending} />
          <WrapperRoute exact path="/videos/:id" component={VideoItemDetails} />
          <WrapperRoute exact path="/gaming" component={Gaming} />
          <WrapperRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
