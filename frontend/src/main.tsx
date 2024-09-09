import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ApiProvider, RouterProvider} from "./providers";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ApiProvider>
        <RouterProvider/>
      </ApiProvider>
    </StrictMode>,
)
