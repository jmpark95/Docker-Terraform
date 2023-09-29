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
  location = var.region
  repository_id = "react-frontend"
  description = "frontend for terraform practice"
  format = "docker"
}

resource "google_cloud_run_v2_service" "default" {
  name     = "terraform-practice"
  location = var.region
  client   = "terraform"

  template {
    containers {
      image = "australia-southeast1-docker.pkg.dev/terraform-practice-400104/react-frontend:latest"
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  name     = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}