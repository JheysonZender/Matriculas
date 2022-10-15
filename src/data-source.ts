import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/labs.db",
    synchronize: true,
    logging: true,
    entities: [
        "dist/entidades/**/*.js"
    ],
})