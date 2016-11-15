import 'reflect-metadata';
import * as Koa from 'koa';
import { createConnection, Connection } from "typeorm";
import { Photo } from './entity/photo';
import { connection } from './connection';

const app = new Koa();

app
	.use(connection)
	.use((ctx, next) => {
		ctx.response.set('X-Application', 'typeorm demo');
		next();
	})
	.use((ctx, next) => {
		ctx.body = { message: 'Hello' };
		next();
	})


app.listen(3000, () => {
	console.log('Server started - http://localhost:3000');
});