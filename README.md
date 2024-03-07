# DDB Back End Developer Challenge

# README:

This repository contains a fun and experimental implementation of the DDB Back End Developer Challenge. The challenge focuses on creating an API for managing a player character's Hit Points (HP) within a game, allowing clients to perform operations like dealing damage, healing, and adding temporary Hit Points.

## Purpose

The purpose of this project is to explore and practice various aspects of back-end development, such as:

- Building RESTful APIs using Express.js
- Implementing business logic for game mechanics
- Working with JSON data and file-based storage
- Writing unit tests to ensure code correctness
- Documenting API endpoints and project structure

## Disclaimer

Please note that this implementation is purely for educational and recreational purposes. It is not intended to be a production-ready solution and may have limitations and simplifications compared to a real-world application.

## Branches

The repository includes different branches that showcase various stages and features of the project:

- `master`: The primary branch, encapsulating the essential functionality.
- `feature/mongodb-integration`: Showcases how MongoDB can serve as a durable storage system for character information.
- `feature/test-and-enhancements`: Created to implement experimental functionality and tests as well as enhance the initial API. 
- `initial-api-no-db`: Represents the initial API setup without database integration.

Feel free to explore the different branches to see how the project evolves and incorporates additional functionalities.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ddb-backend-challenge.git
   ```
2. Install the dependancies:
   ```bash
   cd ddb-back-end-developer-challenge
   npm install
   ```
3. Start the server:
    ```bash
    npm start
    ```
4. The API will be accessible at http://localhost:3000.

## Contributing

As this project is primarily for personal learning and experimentation, contributions are not expected. However, if you have any suggestions, feedback, or ideas, feel free to open an issue or reach out to me.

Special thanks to the D&D Beyond team for creating such a fun project.

Happy coding and may your adventures be filled with critical hits! ⚔️🎲✨

# DOCS:

## API Endpoints

### Get All Characters

- **URL**: `/characters`
- **Method**: `GET`
- **Description**: Retrieves a list of all characters.

### Get Character by ID

- **URL**: `/characters/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific character by their ID.

### Deal Damage

- **URL**: `/characters/:id/damage`
- **Method**: `POST`
- **Description**: Deals damage to a character.
- **Request Body**:
  ```json
  {
    "damageType": "Piercing",
    "damageAmount": 10
  }
  ```
### Heal Character

- **URL**: `/characters/:id/heal`
- **Method**: `POST`
- **Description**: Heals a character.
- **Request Body**:
  ```json
  {
    "healAmount": 20
  }
  ```
### Add Temporary Hit Points

- **URL**: `/characters/:id/temp-hp`
- **Method**: `POST`
- **Description**: Adds temporary Hit Points to a character.
- **Request Body**:
  ```json
  {
    "tempHpAmount": 15
  }
  ```
### Error Handling

The API handles various error scenarios and returns appropriate error responses:

- 400 Bad Request: Returned when the request payload is invalid or missing required fields.
- 404 Not Found: Returned when the requested character is not found.
- 500 Internal Server Error: Returned when an unexpected error occurs on the server.

### Testing

The project includes a set of unit tests to verify the functionality of the API. The tests cover scenarios such as retrieving characters, dealing damage, healing, adding temporary Hit Points, and handling edge cases.

To run the tests, use the following command:

```bash
npm test
```

Future Enhancements

This implementation serves as a starting point and can be further enhanced with additional features and improvements, such as:

- Integrating with a database for persistent storage of character data.
- Implementing authentication and authorization for secure access to the API.
- Adding more robust error handling and logging.
- Optimizing performance through caching and efficient data retrieval.
- Expanding the API to include other game-related operations and data management.
