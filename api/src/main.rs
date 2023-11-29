use api::start_http_server;
use dotenv::dotenv;
use opendevnet_core::Config;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    dotenv().ok();

    let config = Config::init();

    init_tracing();

    start_http_server(config).await;
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
