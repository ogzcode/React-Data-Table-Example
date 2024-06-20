import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { makeServer } from "./server"

// Start the mock server for development
makeServer({ environment: "development" })

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
