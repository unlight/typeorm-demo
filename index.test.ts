import test from 'ava';
import 'reflect-metadata';
import { createConnection, Connection } from "typeorm";
import { Photo } from "./entity/photo";

let connection: Connection;

test.before(async function(t) {
	connection = await createConnection({
		driver: {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "typeorm_demo"
		},
		logging: {
			logQueries: false,
		},
		entities: [
			Photo
		]
	});
});

test.before(async function(t) {
	await connection.syncSchema(true);
});

test.after(async function(t) {
	await connection.close();
});

test('smoke', t => {
	t.pass();
});

test('save', async function(t) {
	let photo = new Photo();
	photo.name = "Me and Bears";
	photo.description = "I am near polar bears";
	photo.fileName = "photo-with-bears.jpg";
	photo.views = 1;
	photo.isPublished = true;

	await connection.entityManager.persist(photo);
});

test('find', async function(t) {
	let photos = await connection.entityManager.find(Photo);
	let [photo] = photos;
});

test('photoRepository', async function(t) {
	let photoRepository = connection.getRepository(Photo);
	let savedPhotos = await photoRepository.find();
	let [photo] = savedPhotos;
});

