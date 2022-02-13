## Опис
REST api із використанням mongodb

створення документа:
POST http://localhost:3000/products 
body: {
  "title": "title",
  "description": "desc",
  "price": 90
}


отримання списку усіх документів:
GET http://localhost:3000/products 


отримання конкретного документа:
GET http://localhost:3000/products/:id 

обновлення документа:
PATCH http://localhost:3000/products/:id 
body: {
  "title": "title",
  "description": "desc",
  "price": 100
}

видалення документа:
Delete http://localhost:3000/products/:id

## Що було тут для мене новим

- eslint
- prettier
- mongoose
