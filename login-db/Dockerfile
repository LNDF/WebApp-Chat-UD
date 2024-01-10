FROM mariadb:11.2.2

ENV MARIADB_ROOT_PASSWORD super_secure_root_password

VOLUME /var/lib/mysql

COPY ./db_init.sql /docker-entrypoint-initdb.d/
