#curl -fsSL https://github.com/du1ana/evres/releases/download/sashi_v3.5.7/setup.sh | cat | sudo SKIP_SYSREQ=1 NO_DOMAIN=1 NETWORK=devnet bash -s install
#!/bin/bash

# Define an array of source and destination file paths
file_paths=(
    "/home/dulana/EvernodeXRPL/sashimono/build/installer.tar.gz /home/dulana/du1ana repos/evres/installer/installer.tar.gz"
    "/home/dulana/EvernodeXRPL/sashimono/build/setup-jshelper.tar.gz /home/dulana/du1ana repos/evres/installer/setup-jshelper.tar.gz"
    "/home/dulana/EvernodeXRPL/sashimono/installer/setup.sh /home/dulana/du1ana repos/evres/installer/setup.sh"
)

cd "/home/dulana/EvernodeXRPL/sashimono/" &&  make -j8 && make installer -j8

# Loop through each pair and perform the copy and replace operation
for path_pair in "${file_paths[@]}"; do
    # Split the pair into source and destination paths
    IFS=' ' read -r source_filepath destination_filepath <<< "$path_pair"

    # Check if the source file exists
    if [ -e "$source_filepath" ]; then
        # Copy and replace the file
        cp -f "$source_filepath" "$destination_filepath"

        # Check if the copy was successful
        if [ $? -eq 0 ]; then
            echo "File copied successfully from $source_filepath to $destination_filepath"
        else
            echo "Error: Failed to copy the file from $source_filepath to $destination_filepath"
        fi
    else
        echo "Error: Source file $source_filepath does not exist"
    fi
done
