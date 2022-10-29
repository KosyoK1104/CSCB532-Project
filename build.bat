@REM docker container rm -f php-nginx-run
@REM docker build -t php-nginx . --no-cache
@REM docker run -v /.:/usr/share/nginx --name php-nginx-run -d -p 80:80 -p 443:443 php-nginx
call config
docker build -t %container_name%:latest .
