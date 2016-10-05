#!/bin/sh
rm -fr test
mkdir ../dist
rm ../dist/*.zip
zip ../dist/lodc-app.zip -r * .[^.]* -x *.git*
