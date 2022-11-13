FROM phpdockerio/php:8.1-fpm
WORKDIR "/var/www"

RUN apt-get update; \
    apt-get -y --no-install-recommends install \
        php8.1-mysql; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
