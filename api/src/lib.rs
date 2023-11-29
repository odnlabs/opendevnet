use std::sync::Arc;

use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method,
    },
    Router,
};
use redis::Client;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::CorsLayer;

mod routes;
mod ws;

use opendevnet_core::{AppState, Config};
use routes::create_router;

pub async fn app(config: Config) -> Router {
    let pool = match PgPoolOptions::new()
        .max_connections(10)
        .connect(&config.database_url)
        .await
    {
        Ok(pool) => {
            tracing::info!("✅ Connection to the database is successful!");
            pool
        }
        Err(err) => {
            tracing::info!("❌ Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    let redis_client = match Client::open(config.redis_url.to_owned()) {
        Ok(client) => {
            tracing::info!("✅ Connection to the redis is successful!");
            client
        }
        Err(e) => {
            tracing::info!("❌ Error connecting to Redis: {}", e);
            std::process::exit(1);
        }
    };

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:000".parse::<HeaderValue>().unwrap())
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::PATCH,
            Method::DELETE,
        ])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    // Build the application with the defined routes
    create_router(Arc::new(AppState {
        db: pool,
        env: config,
        redis_client,
    }))
    .layer(cors)
}
