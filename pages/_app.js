import '../styles/globals.css'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from "../redux"


function MyApp({ Component, pageProps }) {

  const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
  )

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
