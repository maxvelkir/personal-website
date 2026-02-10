# Terraform – GCP Static Site

Static website hosted on GCS behind a global HTTP(S) load balancer with Cloud CDN.

## Setup

```sh
cd terraform
cp terraform.tfvars.example terraform.tfvars  # fill in your values
terraform init
terraform plan
terraform apply
```

## Deploy

```sh
npm run build
gcloud auth login
gsutil -m rsync -r -d dist/ gs://$(terraform output -raw bucket_name)
```
