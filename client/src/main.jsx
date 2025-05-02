import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import routes from './Routes/Routes.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </AuthContextProvider>
)
