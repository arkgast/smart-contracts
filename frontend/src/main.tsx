import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { CustomProvider } from 'rsuite'
import { Home, SimpleStorage } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "simple-storage",
        element: <SimpleStorage />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme={'dark'}>
      <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>,
)
