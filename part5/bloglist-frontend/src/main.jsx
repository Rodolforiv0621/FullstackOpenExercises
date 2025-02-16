import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from '../src/reducers/notificationReducer'
import blogsReducer from '../src/reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
        <App />
    </Provider>
)