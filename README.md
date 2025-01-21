## MYSQL qyeries
CREATE DATABASE chatboat_db;
USE chatboat_db;

# craete query
CREATE TABLE `chatboat_message` (
  `id` int(11) NOT NULL,
  `user_message` varchar(255) NOT NULL,
  `bot_response` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

# To run node app use command :- node server.js
# To run react app :- npm start

