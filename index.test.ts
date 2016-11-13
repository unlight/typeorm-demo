import test from 'ava';
import 'reflect-metadata';
import { createConnection, Connection } from "typeorm";
import { Photo } from "./entity/photo";
import { PhotoMetadata } from './entity/photometadata';
import { Author } from './entity/author';

var connection: Connection;

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
			Photo, PhotoMetadata, Author,
		]
	});
});

test.before(async function(t) {
	await connection.syncSchema(true);
});

test.after(async t => {
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

test('create photo metadata object', async function (t) {
	// create photo object
	let photo = new Photo();
	photo.name = "Me and Bears";
	photo.description = "I am near polar bears";
	photo.fileName = "photo-with-bears.jpg"
	photo.isPublished = true;

	// create photo metadata object
	let metadata = new PhotoMetadata();
	metadata.height = 640;
	metadata.width = 480;
	metadata.compressed = true;
	metadata.comment = "cybershoot";
	metadata.orientation = "portait";
	metadata.photo = photo; // this way we connect them

	// get repository
	let photoRepository = connection.getRepository(Photo);

	// first we should persist a photo
	await photoRepository.persist(photo);
});


