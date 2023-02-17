import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/index'
import './index.css'
import {Provider} from 'react-redux'
import store from './utils/Redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <Router />
    {/* </React.StrictMode> */}
  </Provider>
)
