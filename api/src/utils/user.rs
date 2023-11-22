use chrono::prelude::*;
use serde::Serialize;

use opendevnet_user::models::User;

#[allow(non_snake_case)]
#[derive(Debug, Serialize)]
pub struct FilteredUser {
    pub id: String,
    pub username: String,
    pub email: String,
    pub avatar: String,
    pub verified: bool,
    pub role: String,
    pub createdAt: DateTime<Utc>,
    pub updatedAt: DateTime<Utc>,
}

#[allow(non_snake_case)]
#[derive(Debug, Serialize)]
pub struct PublicUser {
    pub id: String,
    pub username: String,
    pub email: String,
    pub avatar: String,
    pub verified: bool,
    pub role: String,
    pub createdAt: DateTime<Utc>,
}

// #[derive(Serialize, Debug)]
// pub struct UserData {
//     pub user: FilteredUser,
// }

// #[derive(Serialize, Debug)]
// pub struct UserResponse {
//     pub status: String,
//     pub data: UserData,
// }

pub fn filter_user_record(user: &User) -> FilteredUser {
    FilteredUser {
        id: user.id.to_string(),
        email: user.email.to_owned(),
        username: user.username.to_owned(),
        avatar: user.avatar.to_owned(),
        verified: user.verified,
        role: user.role.to_owned(),
        createdAt: user.created_at.unwrap(),
        updatedAt: user.updated_at.unwrap(),
    }
}
