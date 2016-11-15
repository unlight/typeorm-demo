import { createConnection } from "typeorm";
import { Photo } from "./entity/photo";
import { PhotoMetadata } from './entity/photometadata';
import { Author } from './entity/author';

export async function connection(ctx, next): Promise<void> {
	console.log('connection');
	let connection = await createConnection({
		driver: {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "typeorm_demo"
		},
		logging: {
			logSchemaCreation: false,
			logQueries: false,
		},
		entities: [
			Photo, PhotoMetadata, Author,
		]
	});
	console.log('connection2');
	// await connection.syncSchema();
	next();
	console.log('connection3');
	await connection.close();
}