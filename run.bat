call config

docker container rm -f %container_name%
docker run  ^
        --name %container_name%  -d ^
        -p 80:80 ^
        -v %cd%:/var/www ^
        --env ENVIRONMENT=local ^
        %container_name%:latest
