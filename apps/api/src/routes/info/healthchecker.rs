use axum::{response::IntoResponse, Json};

/// Simple health checker handler
pub async fn health_checker_handler() -> impl IntoResponse {
    const MESSAGE: &str = "Rust and Axum Framework: JWT Access and Refresh Tokens";

    let json_response = serde_json::json!({
        "status": "success",
        "message": MESSAGE
    });

    Json(json_response)
}
