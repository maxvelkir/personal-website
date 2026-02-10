# maximekiriakov.com

Personal website and portfolio. Vanilla JS, Vite, deployed on GCP.

**Live →** [maximekiriakov.com](https://maximekiriakov.com)

## Dev

```sh
npm install
npm run dev       # localhost:3000
npm run build     # outputs to dist/
```

## Deploy

```sh
npm run build
gsutil -m rsync -r -d dist/ gs://<your-bucket-name>
```

Infrastructure is managed with Terraform — see [`terraform/`](terraform/).

> `terraform.tfvars` is gitignored. Copy `terraform.tfvars.example` and fill in your values.