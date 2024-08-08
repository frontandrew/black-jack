import { renderToString } from 'react-dom/server'
import { App } from './main'
import { TestSSRPage } from 'pages'

// для теста SSR
// в дальнешем необходимо релизовать render
export const render = () => renderToString(<TestSSRPage />)
