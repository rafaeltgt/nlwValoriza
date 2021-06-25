module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": "no-verify",
    "migrations": [
        "src/database/migrations/*.ts"
    ],
    "entities": [
        "build/entities/*.js"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}