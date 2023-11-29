use redis::Client;
use sqlx::{Pool, Postgres};

pub mod config;

pub use config::Config;

pub struct AppState {
    pub db: Pool<Postgres>,
    pub env: Config,
    pub redis_client: Client,
}
