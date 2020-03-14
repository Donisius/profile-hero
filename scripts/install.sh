#!/usr/bin/env bash

# run install in parallel
cd backend
npm i &

cd ../frontend
npm i &

cd ..
wait
