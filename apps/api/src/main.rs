use api::start_http_server;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    let env = load_env();

    println!("Running HTTP server in {}", env.environment);

    start_http_server().await;

    // let http_server = tokio::task::spawn(start_http_server());

    // Wait for both servers to finish
    // tokio::join!(http_server);
}

struct EnvironmentVariables {
    environment: String,
}

fn load_env() -> EnvironmentVariables {
    dotenv().ok();

    let environment = std::env::var("ENVIRONMENT").expect("ENVIRONMENT must be set");

    if environment != "development" && environment != "production" {
        panic!("ENVIRONMENT must be either 'development' or 'production'");
    }

    EnvironmentVariables { environment }
}
