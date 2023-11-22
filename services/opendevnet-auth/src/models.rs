use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct RegisterUserSchema {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginUserSchema {
    pub email: String,
    pub password: String,
}
