module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": true,
    "migrations": [
        "build/database/migrations/*.js"
    ],
    "entities": [
        "build/entities/*.js"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}