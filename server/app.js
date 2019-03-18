const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
});

app.use(bodyParser());

app.on('error', err => {
  console.error('Server Error', err)
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next()
});

const port = process.env.PORT || 3000;

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, err => {
    if (err) throw err;
    console.log(`App Listening on Port ${port}`)
  });
