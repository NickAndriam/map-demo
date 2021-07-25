import React, { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from './Components/SideBar/SideBar';
import Footer from './Components/Footer/Footer';
import Map from './Components/Map/Map'
import Notification from './Components/Notification/Notification';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const { width, ref } = useResizeDetector()

  useEffect(() => {
    width <= 720 ? dispatch({ type: 'smallScreen' }) : dispatch({ type: 'largeScreen' })
  }, [width])
  return (
    <div className="App" ref={ref}>
      <Notification />
      <SideBar />
      <Map />
      <Footer />
    </div>
  );
}

export default App;
