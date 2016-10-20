#!/bin/bash
docker run -it -v `pwd`:`pwd` -w `pwd` -p 3000:8080 wirus15/nodejs bash
