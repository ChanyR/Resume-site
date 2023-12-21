import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cvSlice from './features/cvSlice';
import userSlice from './features/userSlice';

const myStore = configureStore({
  reducer: {
    cv: cvSlice,
    user: userSlice,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
