#!/bin/sh

docker builder prune

docker container rm $(docker container ls -aq) --force

docker image rm $(docker image ls -aq) --force

docker network prune -f
