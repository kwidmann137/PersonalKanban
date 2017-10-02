import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import SideMenu from 'Components/SideMenu';
import TopMenu from 'Components/TopMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <div>
      <SideMenu />
      <TopMenu />
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </MuiThemeProvider>
)

export default App
