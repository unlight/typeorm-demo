import 'reflect-metadata';
import * as Koa from 'koa';
import { createConnection, Connection } from "typeorm";
import { Photo } from './entity/photo';

const app = new Koa();

app.use((ctx, next) => {
	ctx.response.set('X-Application', 'typeorm demo');
	next();
});

app.use(async function(ctx, next): Promise<void> {
	let connection = await createConnection({
		driver: {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "typeorm_demo"
		},
		entities: [
			Photo
		],
	});
	await connection.syncSchema();
	ctx.state.connection = connection;
	next();
	debugger;
	connection.close();
});

app.use((ctx, next) => {
	debugger;
	let connection = (ctx.state.connection as Connection);
	ctx.body = { message: 'Page Not Found' };
	next();
});

app.listen(3000, () => {
	console.log('Server started - http://localhost:3000');
});