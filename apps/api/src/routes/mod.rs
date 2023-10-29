use std::{path::PathBuf, sync::Arc};

use axum::{
    middleware,
    routing::{get, post},
    Router,
};
use tower_http::{
    services::ServeDir,
    trace::{DefaultMakeSpan, TraceLayer},
};

mod auth;
mod info;
mod users;

use auth::{
    login::login_user_handler, logout::logout_handler, refresh::refresh_access_token_handler,
    register::register_user_handler,
};
use info::root::root_handler;
use users::get_me::get_me_handler;

use crate::{utils::jwt_auth::auth, utils::ws::ws_handler, AppState};

pub fn create_router(app_state: Arc<AppState>) -> Router {
    let assets_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("assets");

    Router::new()
        // Static files
        .fallback_service(ServeDir::new(assets_dir).append_index_html_on_directories(true))
        // WebSocket
        .route("/ws", get(ws_handler))
        // Auth
        .route("/api/auth/register", post(register_user_handler))
        .route("/api/auth/login", post(login_user_handler))
        .route("/api/auth/refresh", get(refresh_access_token_handler))
        .route(
            "/api/auth/logout",
            get(logout_handler)
                .route_layer(middleware::from_fn_with_state(app_state.clone(), auth)),
        )
        // Info
        .route("/api", get(root_handler))
        // Users
        .route(
            "/api/users/me",
            get(get_me_handler)
                .route_layer(middleware::from_fn_with_state(app_state.clone(), auth)),
        )
        .with_state(app_state)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::default().include_headers(true)),
        )
}
