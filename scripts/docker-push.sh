#!/bin/bash

# Takes username and repository name as arguments from the bash script
username=$1
repo_name=$2

if [ $# -ne 2 ]; then
    echo -e     "Usage: $0 <username> <repo_name>\n"
    echo -n -e  "Description:\n\tThis script pushes a Docker image to Docker Hub. " 
    echo -e     "You are\n\trequired to be logged into Docker to use this script!\n"
    echo -e     "Arguments:\n\tusername\tYour Docker Hub username"
    echo -e     "\trepo_name\tThe name of the repository you wish to push to\n"
    echo -e     "Example:\n\t$0 spencrc tribeinator"
    exit 1
fi

# Finds the current directory, and spits out its name in lowercases
directory=${PWD##*/}
source_image=$(basename $directory | awk '{print tolower($0)}')

# Creates a tag from current timestamp
tag=$(date '+%Y%m%d%H%M%S')

# Creates a variable that contains entire target image
target_image=$username/$repo_name

# Goes to the project's folder
cd ..

# Tags and pushes docker image
docker tag $source_image-bot $target_image:$tag
docker push $target_image:$tag