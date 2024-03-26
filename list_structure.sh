#!/bin/bash

# Function to list files recursively
list_files() {
    local directory="$1"
    local indent="$2"
    local files=$(ls -p "$directory" | grep -v / | grep -v node_modules)
    local folders=$(ls -p "$directory" | grep / | grep -v node_modules)

    # List files in current directory
    for file in $files; do
        echo "${indent}${file}"
    done

    # Recursively list files in subdirectories
    for folder in $folders; do
        echo "${indent}${folder}"
        list_files "${directory}/${folder}" "${indent}    "
    done
}

# Start listing from the root directory
list_files . ""
