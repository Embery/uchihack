# UchiHack. Модуль взаимного обучения

## Описание проекта

### Реализованная функциональность
- Функционал 1;
- Функционал 2;
- Функционал 3;

### Особенность проекта в следующем:
-	фича-1;
-	фича-2;
-	фича-3;

### Основной стек технологий:
-	Frontend: React, MobX, Ant Design
-	Backend: Python, PostgreSQL, Docker


## Демо

##### Приложение доступно по адресу:
ссылка

##### Доступ для тестового пользователя: 
- `email`: hack@uchi.ru 
- `password`: hack2021

##### Скринкаст доступен по адресу: 
ссылка


## НЕОБХОДИМЫЕ УСЛОВИЯ ДЛЯ РАБОТЫ ПРИЛОЖЕНИЯ
- развертывание сервиса производится путем запуска docker контейнера
- все зависимости устанавливаются при сборке docker образа
- работа сервиса проверялась на docker версии `Docker version 20.10.8, build 3967b7d`
- требуется установленная СУБД PostgeSQL (9.6+)

### Переменные окружения
- `PORT` - порт сервиса (по умолчанию `8080`)
- `DATABASE_URL` - DNS PostreSQL (формат: `postgresql://user:password@host:port/dbname`)

### УСТАНОВКА, НАСТРОЙКА
Сборка docker образа:
```
docker build -t uchi-hack -f Dockerfile .
```
Запуск docker образа:
```
docker run -p 8080:8080 -t test-uchi
```

### База данных
Необходимо создать пустую базу данных, а подключение к базе прописать в переменную окружения `DATABASE_URL`

### Выполнение миграций
Выполнение миграций:
```
alembic upgrade head
```

### Фронт
Сборка:
```
npm run build
```
после этого в папке build будет лежать готовая статика, ее заливать любым доступным способом (хоть nginx, смотрящий в эту папку настроить, хоть как)

Бонус: есть пакет gh-pages в зависимостях, с ним можно поменять homepage в package.json, а потом сделать просто npm run deploy и все зальется в ветку gh-pages соответствующего репозитория


## Разработчики
- Ромашкина Светлана Алексеевна (https://t.me/test@esterelle)
- Типсин Евгений Андреевич (https://t.me/test@t1ps1n)
