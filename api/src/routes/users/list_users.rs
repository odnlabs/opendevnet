use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use opendevnet_core::AppState;
use opendevnet_user::PublicUser;
use sqlx::Row;
use uuid::Uuid;

pub async fn list_users(
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let result = sqlx::query("SELECT * FROM users")
        .fetch_all(&data.db)
        .await
        .map_err(|e| {
            tracing::error!("Database error: {:?}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "status": "error",
                    "message": "Database error",
                })),
            )
        })?;

    let users: Vec<PublicUser> = result
        .into_iter()
        .map(|row| PublicUser {
            id: row.get::<Uuid, _>("id").to_string(),
            username: row.get("username"),
            email: row.get("email"),
            avatar: row.get("avatar"),
            verified: row.get("verified"),
            role: row.get("role"),
            createdAt: row.get("created_at"),
            // Map other fields accordingly.
        })
        .collect();

    let json_response = serde_json::json!({
        "status":  "success",
        "data": serde_json::json!({
            "users": users
        })
    });

    Ok(Json(json_response))
}
