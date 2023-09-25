terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)
  project = var.project
  region  = var.region
  zone    = var.zone
}



resource "google_artifact_registry_repository" "my-repo" {
  location      = "australia-southeast1"
  repository_id = "frontend"
  description   = "react frontend"
  format        = "docker"
}

resource "google_cloud_run_v2_service" "default" {
  name     = "terraform-practice"
  location = "australia-southeast1"
  client   = "terraform"

  template {
    containers {
      image = "australia-southeast1-docker.pkg.dev/terraform-practice-400104/frontend/frontend:0.0.1"
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  name     = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}