FROM mysql:8.0
EXPOSE 3306
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=budget
COPY data.sql /docker-entrypoint-initdb.d