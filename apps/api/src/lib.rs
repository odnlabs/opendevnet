mod routes;

use routes::create_routes;

pub async fn start_http_server() {
    // Build our application with the routes we've defined
    let app = create_routes();

    // Run it with hyper on localhost:5000
    axum::Server::bind(&"0.0.0.0:5000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
