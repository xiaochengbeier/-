import React from 'react';
import {BrowserRouter,Route}from "react-router-dom"
import MovieIndex from './pages/PageIndex';
import {Provider}from "react-redux"
import { store } from './redux';
function App() {
  return (
   <Provider store={store}>
       <BrowserRouter>
       <Route path="/" component={MovieIndex}/>
       </BrowserRouter>
   </Provider>
  
  );
}

export default App;
