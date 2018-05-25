#!/bin/sh

PROJECT_NAME=${1}
MODULE_NAME=${2}

echo 'get params 1:' $PROJECT_NAME 'get params 2:' $MODULE_NAME

echo 'create workspace start'
ROOTPATH=/data/wwwroot/default/$PROJECT_NAME/
echo $ROOTPATH
BACKUPSPATH=/data/wwwroot/default/backups/$PROJECT_NAME/$MODULE_NAME
echo $BACKUPSPATH
if [ ! -d $ROOTPATH ];
then
    mkdir -p $ROOTPATH
fi
if [ ! -d $BACKUPSPATH ];
then
    mkdir -p $BACKUPSPATH
fi
echo 'create workspace end'

echo 'backups ' $MODULE_NAME ' server'
if [ -d $ROOTPATH/$MODULE_NAME ];
then
    bakUrl=$BACKUPSPATH/$(date +%Y%m%d%H%M%S)
    mkdir -p $bakUrl
    bakPrefix=$(date +%Y%m%d%H%M%S)
    echo 'backups ' $APP_NAME ' server doing...'
    mv $ROOTPATH/* $bakUrl/$MODULE_NAME-$bakPrefix
    echo 'backups ' $MODULE_NAME ' server done...'
fi

rm -rf $ROOTPATH/*

echo 'start ' $MODULE_NAME ' server'
cp -rf ../$MODULE_NAME/ $ROOTPATH/
echo $MODULE_NAME Start Success!
