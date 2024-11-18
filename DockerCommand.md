Build: docker build -t books-app .

docker run --env-file .env -p 3000:3000 --name books-app books-app

