#!/bin/bash

# Disclaimer
# To be used only for local development

IMAGE_NAME="mysql"
CONTAINER_NAME="mysql"
MYSQL_ROOT_PASSWORD="rootpassword"
MYSQL_DATABASE="ent"
MYSQL_USER="ent"
MYSQL_PASSWORD="password"
HOST_PORT=3306
VOLUME_NAME="mysql-data"

# Build the Docker image
docker build -t $IMAGE_NAME -f docker/images/mysql/Dockerfile .

# Run the container with a persistent volume and environment variables
docker run -d \
  --name $CONTAINER_NAME \
  -p $HOST_PORT:3306 \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  -e MYSQL_USER=$MYSQL_USER \
  -e MYSQL_PASSWORD=$MYSQL_PASSWORD \
  -v $VOLUME_NAME:/var/lib/mysql \
  $IMAGE_NAME
