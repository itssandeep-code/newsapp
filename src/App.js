
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {  Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize=10;
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress =(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return ( 
      <div className="App">
      <NavBar />
      <LoadingBar color="#f11946" progress={this.state.progress} />

      <Routes>
        <Route path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" category="general"/>}></Route>
        <Route path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="us" category="business"/>}></Route>
        <Route path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}></Route>
        <Route path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="us" category="health"/>}></Route>
        <Route path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="us" category="science"/>}></Route>
        <Route path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="us" category="sports"/>}></Route>
        <Route path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="us" category="technology"/>}></Route>
        
      </Routes>
    </div>
   
    )
  }
}


