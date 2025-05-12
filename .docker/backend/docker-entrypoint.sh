#!/bin/bash
set -e

# Run composer install if vendor directory doesn't exist
if [ ! -d "/var/www/html/vendor" ]; then
    echo "Installing dependencies..."
    composer install
fi

# Execute the main command
exec "$@" 
