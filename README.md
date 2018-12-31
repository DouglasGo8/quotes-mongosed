# Docker

docker build -t quotes-mongosed .
docker run -d --name quotes-mongosed --rm --env SERVER_HOST={ip} -p 10254:10254 douglasdb/quotes-mongosed