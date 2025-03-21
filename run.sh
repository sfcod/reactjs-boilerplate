#!/bin/bash

# Find all .scss files, excluding build and node_modules directories
for file in $(find . -type f -name "*.scss" -not -path "*/build/*" -not -path "*/node_modules/*"); do
    echo "Processing: $file"
    # Run the sass-migrator command with the current file path
    sass-migrator module --migrate-deps "$file"
done

echo "Migration complete!"