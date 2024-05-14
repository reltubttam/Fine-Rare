# Fine-Rare

## running the application

### build
```
npm i && npm run build && docker compose build
```

### starting the application
```
docker compose up
```

### tests
```
npm t
```

### linting
```
npm run lint
```

### fix linting
```
npm run lint -- --fix
```

## API

### Create Products
```
curl --location 'localhost:3000' \
--header 'x-user-id: foo' \
--header 'Content-Type: application/json' \
--data '{
    "query": "mutation {createProducts(products:[{<PRODUCT FIELDS>}]){<RESPONSE FIELDS>}}"
}'
```

### Update Products
```
curl --location 'localhost:3000' \
--header 'Content-Type: application/json' \
--data '{
    "query": "mutation {updateProduct(_id: \"<PRODUCT _ID>\", product:{<PRODUCT FIELDS>}){<RESPONSE FIELDS>}}"
}'
```

### Delete Products
```
curl --location 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data '{
    "query": "mutation {deleteProduct(_id: \"<PRODUCT _ID>\")}"
}'
```

### Get Products
```
curl --location 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data '{
        "query": "query {getProduct(_id: \"<PRODUCT _ID>\"){<RESPONSE FIELDS>}}"
}'
```

### Get Products By Producer
```
curl --location 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data '{
    "query": "query {getProductsByProducer(_id: \"<PRODUCT _ID>\"){<RESPONSE FIELDS>}}"
}'
```