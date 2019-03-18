const Router = require('koa-router');
const search = require('./search');
const loadData = require('./load_data');

const router = new Router();

router.get('/search', async ctx => {
    const { term } = ctx.request.query;
    const res = await search.queryTerm(term);
    ctx.body = res.hits.hits.map(obj => obj._source.fileName);
});

router.post('/index', async ctx => {
    const { name, content } = ctx.request.body;
    loadData(name, content);
    ctx.status = 201;
    ctx.body = {
        status: 'success',
    };
});

module.exports = router;
