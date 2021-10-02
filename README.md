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
-	Frontend: ...
-	Backend: Python, Docker, PostgreSQL

## Демо

##### Приложение доступно по адресу:
ссылка

##### Доступ для тестового пользователя: 
- email:login (указать логин), 
- пароль: password (указать пароль)

##### Скринкаст доступен по адресу: 
ссылка


## НЕОБХОДИМЫЕ УСЛОВИЯ ДЛЯ РАБОТЫ ПРИЛОЖЕНИЯ

### Переменные окружения
- `PORT` - порт сервиса (по умолчанию `8080`)
- `DATABASE_URL` - DNS PostreSQL (формат: `postgresql://user:password@host:port/dbname`)


- развертывание сервиса производится на debian-like linux (debian 9+);
- требуется установленный web-сервер с поддержкой PHP(версия 7.4+) интерпретации (apache, nginx);
- требуется установленная СУБД MariaDB (версия 10+);
- требуется установленный пакет name1 для работы с...;

### УСТАНОВКА, НАСТРОЙКА
Установка пакета name
Выполните
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install name1
sudo apt-get install mariadb-client mariadb-server
git clone https://github.com/Sinclear/default_readme
cd default_readme
...

### База данных
Необходимо создать пустую базу данных, а подключение к базе прописать в переменную окружения `DATABASE_URL`

### Выполнение миграций
Выполнение миграций:
```
alembic upgrade head
```

### Установка зависимостей проекта
Установка зависимостей осуществляется с помощью Composer. Если у вас его нет вы можете установить его по инструкции на getcomposer.org.
После этого выполнить команду в директории проекта:
composer install


### Разработчики
- Ромашкина Светлана Алексеевна (https://t.me/test@@esterelle)
- Типсин Евгений Андреевич (https://t.me/test@@t1ps1n)