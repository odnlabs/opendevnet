use api::app;
use dotenv::dotenv;
use opendevnet_core::Config;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    dotenv().ok();

    let config = Config::init();

    init_tracing();

    // Run it with hyper on localhost:5000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:5000").await.unwrap();
    tracing::info!("🔗 Listening on: {}", listener.local_addr().unwrap());
    tracing::info!("🚀 API server started successfully");
    axum::serve(listener, app(config).await).await.unwrap();
}

fn init_tracing() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "api=debug,tower_http=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();
}

#[cfg(test)]
mod tests {
    use axum::{
        body::Body,
        http::{Request, StatusCode},
    };
    use http_body_util::BodyExt; // for `collect`
    use serde_json::{json, Value};
    use tower::ServiceExt;

    use super::*; // for `call`, `oneshot`, and `ready`

    #[tokio::test]
    async fn root() {
        dotenv().ok();
        let config = Config::init();

        let app = app(config).await;

        let response = app
            .oneshot(Request::builder().uri("/api").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body = response.into_body().collect().await.unwrap().to_bytes();
        let body: Value = serde_json::from_slice(&body).unwrap();
        assert_eq!(
            body,
            json!({ "status": 200, "message": "🚀 Welcome to the Open Dev Net API!" })
        );
    }

    #[tokio::test]
    async fn not_found() {
        dotenv().ok();
        let config = Config::init();

        let app = app(config).await;

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/does-not-exist")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::NOT_FOUND);
        let body = response.into_body().collect().await.unwrap().to_bytes();
        assert!(body.is_empty());
    }
}
