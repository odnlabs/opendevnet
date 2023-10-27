use api::{start_http_server, utils::config::Config};

use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let config = Config::init();

    start_http_server(config).await;
}
