use axum::{http::StatusCode, response::IntoResponse, Extension, Json};

use crate::utils::{jwt_auth::JWTAuthMiddleware, user::filter_user_record};

pub async fn get_me_handler(
    Extension(jwtauth): Extension<JWTAuthMiddleware>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let json_response = serde_json::json!({
        "status":  "success",
        "data": serde_json::json!({
            "user": filter_user_record(&jwtauth.user)
        })
    });

    Ok(Json(json_response))
}
