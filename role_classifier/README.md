# Preparing the environment

## Create a virtual environment

```bash
python3 -m venv env
```

## Activate the virtual environment

```bash
source env/bin/activate
```

## Install dependencies

```bash 
pip install -r requirements.txt
```

# Testing

functions-framework-python --target hello_http --debug

# Deploying

gcloud functions deploy role_classifier \
  --gen2 \
  --runtime=python312 \
  --region=us-east4 \
  --source=. \
  --entry-point=hello_http \
  --trigger-http \
  --allow-unauthenticated

# Testing

## Obtain the URL of the function
gcloud functions describe role_classifier \
  --region us-east4

## Test Data

```curl
curl -X POST -H "Content-Type: application/json" -d '{
  "fileId": "17KZoPvfYkNDVBprquNORIZsieAsEFrCH"
}' localhost:8080
```

# References

https://cloud.google.com/functions/docs/create-deploy-http-python