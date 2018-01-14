import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'


render(
    <App />,
  document.getElementById('root')
)
