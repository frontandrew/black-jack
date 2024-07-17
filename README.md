# 🃏 Blackjack [Game](https://blackjack-cheaters.netlify.app/) 🎲

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8.2-blue)
![Redux](https://img.shields.io/badge/Redux-9.1.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## Описание проекта

Добро пожаловать в игру Blackjack на JavaScript с использованием React и TypeScript! Игра позволяет сыграть против дилера, используя базовые правила Blackjack.

## Демонcтрация:
![msedge_ViURtHeheB](https://github.com/user-attachments/assets/8d9f703d-2962-48e5-a51d-917e87ba1ce2)

[Документация](./docs/README.md) [LiveDemo](https://blackjack-cheaters.netlify.app/)

![Blackjack](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Blackjack.svg/512px-Blackjack.svg.png)

## Возможности

- Реализация базовых правил игры Blackjack.
- Использование Redux для управления состоянием игры.
- Отрисовка игрового процесса с использованием `<canvas>`.
- Возможность делать ставки и управлять балансом игрока.
- Feature-Sliced Design (FSD) методология для организации кода.

## Скриншоты

ToDo

## Установка, настройка, запуск и тестирование проекта

### Запуск

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Добавление зависимостей
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Лицензия

Этот проект лицензируется по лицензии MIT - подробности см. в файле [LICENSE](./LICENSE.md)
