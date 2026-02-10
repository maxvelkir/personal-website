output "load_balancer_ip" {
  value = google_compute_global_address.default.address
}

output "bucket_name" {
  value = google_storage_bucket.static_site.name
}

output "dns_auth_record" {
  value = {
    name = google_certificate_manager_dns_authorization.default.dns_resource_record[0].name
    type = google_certificate_manager_dns_authorization.default.dns_resource_record[0].type
    data = google_certificate_manager_dns_authorization.default.dns_resource_record[0].data
  }
}
