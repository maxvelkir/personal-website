resource "google_compute_global_address" "default" {
  name = "${var.project_prefix}-lb-ip"
}

resource "google_compute_backend_bucket" "static_site" {
  name        = "${var.project_prefix}-backend-bucket"
  bucket_name = google_storage_bucket.static_site.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    client_ttl        = 3600
    negative_caching  = true
    serve_while_stale = 86400
  }
}

# SSL — Certificate Manager with DNS authorization
resource "google_certificate_manager_dns_authorization" "default" {
  name   = "${var.project_prefix}-dnsauth"
  domain = var.domain
}

resource "google_certificate_manager_certificate" "default" {
  name = "${var.project_prefix}-cert"
  managed {
    domains            = [var.domain]
    dns_authorizations = [google_certificate_manager_dns_authorization.default.id]
  }
}

resource "google_certificate_manager_certificate_map" "default" {
  name = "${var.project_prefix}-certmap"
}

resource "google_certificate_manager_certificate_map_entry" "root" {
  name         = "${var.project_prefix}-root-entry"
  map          = google_certificate_manager_certificate_map.default.name
  certificates = [google_certificate_manager_certificate.default.id]
  hostname     = var.domain
}

# HTTPS
resource "google_compute_url_map" "default" {
  name            = "${var.project_prefix}-url-map"
  default_service = google_compute_backend_bucket.static_site.id
}

resource "google_compute_target_https_proxy" "default" {
  name            = "${var.project_prefix}-https-proxy"
  url_map         = google_compute_url_map.default.id
  certificate_map = "//certificatemanager.googleapis.com/${google_certificate_manager_certificate_map.default.id}"
}

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "${var.project_prefix}-https-rule"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address            = google_compute_global_address.default.address
  ip_protocol           = "TCP"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
}

# HTTP — always redirects to HTTPS
resource "google_compute_url_map" "https_redirect" {
  name = "${var.project_prefix}-https-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_http_proxy" "default" {
  name    = "${var.project_prefix}-http-proxy"
  url_map = google_compute_url_map.https_redirect.id
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "${var.project_prefix}-http-rule"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address            = google_compute_global_address.default.address
  ip_protocol           = "TCP"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
}
