# Docker

docker build -t quotes-mongosed .
docker run -d --name quotes-mongosed --rm --env SERVER_HOST=192.168.1.34 -p 10254:10254 douglasdb/quotes-mongosed