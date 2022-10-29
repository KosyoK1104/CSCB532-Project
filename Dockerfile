FROM php:8.1-fpm-alpine3.16


ENV S6_OVERLAY_ARCH amd64
ENV S6_OVERLAY_VERSION 2.2.0.3
ENV TMP_BUILD_DIR /tmp/build

WORKDIR ${TMP_BUILD_DIR}
RUN curl -R -L -O https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_OVERLAY_ARCH}.tar.gz && \
    gunzip -c ${TMP_BUILD_DIR}/s6-overlay-${S6_OVERLAY_ARCH}.tar.gz | tar -xf - -C / && \
    rm ${TMP_BUILD_DIR}/s6-overlay-${S6_OVERLAY_ARCH}.tar.gz


ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /bin/wait.sh
RUN chmod a+rx /bin/wait.sh

RUN apk --update --no-cache add nginx autoconf g++ make gmp-dev && \
    docker-php-ext-configure pcntl --enable-pcntl && \
    docker-php-ext-install \
    pdo_mysql \
    gmp \
    opcache \
    sockets \
    bcmath \
    pcntl \
    && \
    apk del g++ make curl tar xz && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/www/localhost


COPY .docker/config/nginx/nginx.conf /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /etc/nginx/nginx.conf

COPY .docker/services.d/nginx.sh /etc/services.d/nginx/run
RUN dos2unix /etc/services.d/nginx/run && \
    chmod a+rwx /etc/services.d/nginx/run


COPY .docker/config/php-fpm/fpm-pool.conf /usr/local/etc/php-fpm/d/zzz-www.conf

COPY .docker/services.d/php-fpm.sh /etc/services.d/php-fpm/run
RUN dos2unix /etc/services.d/php-fpm/run && \
    chown www-data:www-data /etc/services.d/php-fpm/run && \
    chmod a+rwx /etc/services.d/php-fpm/run


RUN mv /var/www/html /var/www/public && \
    chown www-data:www-data /var/www/public


WORKDIR /var/www
COPY --chown=www-data:www-data . /var/www

USER www-data:www-data

EXPOSE 80 443
ENTRYPOINT ["/init"]


