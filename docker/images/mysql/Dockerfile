FROM mysql:8.0.32

EXPOSE ${PORT}

RUN mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

CMD ["mysqld"]
