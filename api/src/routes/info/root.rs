use axum::{response::IntoResponse, Json};

pub async fn root_handler() -> impl IntoResponse {
    const MESSAGE: &str = "🚀 Welcome to the Open Dev Net API!";

    let json_response = serde_json::json!({
        "status": 200,
        "message": MESSAGE
    });

    Json(json_response)
}
