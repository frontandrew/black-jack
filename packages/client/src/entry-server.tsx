import { renderToString } from 'react-dom/server'
import { TestSSRPage } from 'pages/index'

// для теста SSR
// в дальнешем необходимо релизовать render
export const render = () => renderToString(<TestSSRPage />)
