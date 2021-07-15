#!/bin/bash
while test $# -gt 0; do
           case "$1" in
                --password)
                    shift
                    password_argument=$1
                    shift
                    ;;
                --url)
                    shift
                    url_argument=$1
                    shift
                    ;;
                --init)
                    shift
                    init_argument=true
                    ;;
                *)
                   echo "$1 is not a recognized flag!"
                   return 1;
                   ;;
          esac

  done  

if [ -n "${password_argument+set}" ];
then psql -U postgres -d portfoliodb -c "INSERT INTO PasswordStore(password) VALUES ('$password_argument')"
echo "Password: $password_argument";
fi
if [ -n "${url_argument+set}" ];
then sed -i -E "s,(static baseUrl: string = ').+?(';),\1$url_argument\2," src/app/middleware/DatabaseCommunicator.ts
echo "Url: $url_argument";
fi
if [ -n "${init_argument+set}" ];
then psql -U postgres -c "CREATE DATABASE portfoliodb;"
psql -U postgres -d portfoliodb -a -f server/initDatabase.sql
echo "Url: $init_argument";
fi

ng build;

echo "Build finished";
