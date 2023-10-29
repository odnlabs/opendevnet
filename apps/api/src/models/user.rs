use chrono::prelude::*;
use serde::{Deserialize, Serialize};

#[allow(non_snake_case)]
#[derive(Debug, Deserialize, sqlx::FromRow, Serialize, Clone)]
pub struct User {
    pub id: uuid::Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone_number: Option<String>,
    pub display_name: Option<String>,
    pub avatar: String,
    pub banner: String,
    pub bio: String,
    pub verified: bool,
    pub verified_at: Option<DateTime<Utc>>,
    pub accent_color: Option<String>,
    pub role: String,
    #[serde(rename = "createdAt")]
    pub created_at: Option<DateTime<Utc>>,
    #[serde(rename = "updatedAt")]
    pub updated_at: Option<DateTime<Utc>>,
}
