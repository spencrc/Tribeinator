#!/bin/bash
set -e # Exit on error

echo "Started re-building Docker image."
docker compose build
echo "Sucessfully re-built Docker image!"

echo "Restarting the Discord bot."
docker compose up -d

echo "Successfully updated bot!"