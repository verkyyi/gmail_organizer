#!/bin/sh

# This script is used to deploy the application to the server.

# 1 Deploy Google Apps Script using clasp
cd gapps_script
clasp push
cd ..

# 2 Deploy Cloud Functions using gcloud
gcloud functions deploy label_classifier \
  --gen2 \
  --runtime=python312 \
  --region=us-east4 \
  --source=label_classifier \
  --entry-point=hello_http \
  --trigger-http \
  --allow-unauthenticated

gcloud functions deploy label_creation \
  --gen2 \
  --runtime=python312 \
  --region=us-east4 \
  --source=label_creation \
  --entry-point=hello_http \
  --trigger-http \
  --allow-unauthenticated

gcloud functions deploy role_classifier \
  --gen2 \
  --runtime=python312 \
  --region=us-east4 \
  --source=role_classifier \
  --entry-point=hello_http \
  --trigger-http \
  --allow-unauthenticated
