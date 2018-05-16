#!/bin/sh

PROJECT_NAME=${1}
MODULE_NAME=${2}

echo 'get params 1:' $MODULE_NAME

echo 'backups ' $MODULE_NAME ' server'

if [ -d /data/wwwroot/default/$PROJECT_NAME/$MODULE_NAME/ ];
then

    bakUrl=/data/wwwroot/default/backups/$PROJECT_NAME/$(date +%Y%m%d%H%M%S)
    bakPrefix=$(date +%Y%m%d%H%M%S)

    echo 'backups ' $APP_NAME ' server doing...'

    mkdir -p $bakUrl
    mv /data/wwwroot/default/$PROJECT_NAME/$MODULE_NAME/ $bakUrl/$MODULE_NAME-$bakPrefix

fi

echo 'backups ' $MODULE_NAME ' server done...'

rm -rf /usr/local/$PROJECT_NAME/$MODULE_NAME/*

echo 'start ' $MODULE_NAME ' server'
cp -rf ../$MODULE_NAME/ /data/wwwroot/default/$PROJECT_NAME/$MODULE_NAME/
echo $MODULE_NAME Start Success!

