#!/bin/bash
docker run -it -v `pwd`:`pwd` -w `pwd` -p 3000:3000 wirus15/nodejs bash
