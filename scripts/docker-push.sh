#!/bin/bash

# Takes username and repository name as arguments from the bash script
username=$1
repo_name=$2

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