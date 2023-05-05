#!/bin/bash

URL=http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb:5984


exec curl -X PUT $URL/_users &
exec curl -X PUT $URL/module_app_users &
status_code_created=$(curl --write-out '%{http_code}' --silent --output /dev/null -X PUT $URL/module_app_created_modules)
exec $(sleep 1 &)
if [[ "$status_code_created" -eq 201 ]] ; then
    exec curl -H 'Content-Type: application/json' -X POST $URL/module_app_created_modules -d '
        {
            "_id": "meta",
            "types": [
              "Wahlmodul",
              "Pflichtmodul",
              "Praktikum",
              "Seminar"
            ],
            "semester": [
              "WS",
              "SS",
              "WS+SS"
            ],
            "studiengaenge": {
              "CIT": {
                "Elektrotechnik und Informationstechnik": [
                  "Elektrotechnik und Informationstechnik, B.Sc.",
                  "Elektrotechnik und Informationstechnik, M.Sc.",
                  "Communications Engineering, M.Sc."
                ]
              }
            },
            "module_user_mappings": {}
        }
        ' &
fi

status_code_updated=$(curl --write-out '%{http_code}' --silent --output /dev/null -X PUT $URL/module_app_updated_modules)
exec $(sleep 1 &)
if [[ "$status_code_updated" -eq 201 ]] ; then
    exec curl -H 'Content-Type: application/json' -X POST $URL/module_app_updated_modules -d '
        {
            "_id": "meta",
            "types": [
              "Wahlmodul",
              "Pflichtmodul",
              "Praktikum",
              "Seminar"
            ],
            "semester": [
              "WS",
              "SS",
              "WS+SS"
            ],
            "studiengaenge": {
              "CIT": {
                "Elektrotechnik und Informationstechnik": [
                  "Elektrotechnik und Informationstechnik, B.Sc.",
                  "Elektrotechnik und Informationstechnik, M.Sc.",
                  "Communications Engineering, M.Sc."
                ]
              }
            },
            "module_user_mappings": {}
        }
        '
fi