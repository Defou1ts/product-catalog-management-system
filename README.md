## Описание

Необходимо разработать систему для управления каталогом продуктов, которая будет состоять из нескольких микросервисов с использованием Nest.js и GraphQL. Каждый микросервис будет отвечать за определенные функциональности.

## Используемые технологии

- Nest.js для разработки микросервисов.
- GraphQL в качестве языка запросов и мутаций для взаимодействия между микросервисами и клиентским приложением.
- База данных PostgreSQL.
- TypeORM - библиотека, предназначенная для работы с базами данных через объектно-реляционное отображение.
- Логирование событий с использованием библиотеки Winston.
- Обработки платежей с использованием PayPal.
- Docker для контейнеризации.
- Jest для модульного тестирования.

## Требования

1. Разделение системы на следующие микросервисы:
   - Каталог продуктов отвечает за управление продуктами, их создание, просмотр, обновление и удаление.
   - Корзина покупок отвечает за управление корзиной покупок пользователей.
   - Заказы отвечают за управление заказами пользователей.
   - Использовать Graphql Federation для объединения микросервисов под один gateway
2. Cхема GraphQL для каждого микросервиса с соответствующими типами данных, запросами и мутациями.
   - Один из сервисов написать на code first approach,
   - Один из сервисов написать на schema first approach
3. Авторизация и аутентификация
   - JSON Web Tokens (JWT) и механизма сессий.
   - Помимо верификации токена, выполнить валидацию токена
   - Настроить RBAC (role based access control) и/или PBAC (permission based access control)
4. Механизм кэширования запросов и данных для повышения производительности.

## Дополнительно

1. Для typeorm настроить миграции схем для продакшн сборки (для разработки можно использовать synchronize: true, чтобы не терять время)
2. Настроить микросервисную архитектуру с использованием kafka и паттерна cqrs
   - Kafka можно запустить локально с использованием docker и -cker-compose
   - Настроить базу данных redis для одного из микросервисов

## Так же проект предполагает

- Качество и чистоту кода микросервисов.
- Эффективность использования микросервисной архитектуры и GraphQL.
- Соответствие требованиям и функциональности, указанным в задании.
- Корректность обработки ошибок и возврата соответствующих статусов.
- Качество и полнота тестового покрытия микросервисов.
- Применение правил валидации данных и обработки ввода пользователя.
- Качество логирования.
