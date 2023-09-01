mod hello_world;

use axum::{routing::get, Router};

pub fn create_routes() -> Router {
    let routes = Router::new().route("/", get(hello_world::hello_world));

    routes
}
