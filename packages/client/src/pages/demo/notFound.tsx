import { Helmet } from 'react-helmet'

import { Header } from './header'
import { usePage } from '../../shared/utils/usePage'

export const NotFoundPage = () => {
  usePage({ initPage: initNotFoundPage })

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <Header />
      Страница не найдена!
    </div>
  )
}

export const initNotFoundPage = () => Promise.resolve()
