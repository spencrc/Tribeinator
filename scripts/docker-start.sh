#!/bin/bash
set -e # Exit on error

echo "Started building Docker image."
docker compose build
echo "Sucessfully built Docker image!"

echo "Starting the Discord bot."
docker compose --profile bot up -d

echo "Successfully updated bot!"