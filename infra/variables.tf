// Add only Variables that'll be used Globally across all modules
// Adding default values to environment and region to assist developers will testing in development environment

variable "environment" {
  description = "The Deployment environment"
  type        = string
  default     = "dev"
}

variable "domain" {
  description = "The FQDN domain"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "org_name" {
  description = "Name of Organisation"
  type        = string
}

variable "db_name" {
  description = "Name of the PostgreSQL Database"
  type        = string
}

variable "db_user_name" {
  description = "Name of User for Accessing PGQSL Database"
  type        = string
}

variable "db_pwd_parameter_name" {
  description = "Name of the Parameter holding DB Password"
  type        = string
  default     = "dbpassword"
}

variable "assume_role_account_id" {
  description = "ID Of the Account which needs to be assumed to run terraform"
  type        = string
}

variable "google_cloud_project" {
  description = "Google Cloud Project"
  type        = string
}