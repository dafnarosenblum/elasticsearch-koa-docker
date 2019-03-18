const { client, index, type } = require('./connection')

module.exports = {
  queryTerm (term) {
    const body = {
      query: {
        multi_match: {
          query: term,
          operator: 'and',
          fuzziness: 'auto'
        }
      }
    };

    return client.search({ index, type, body })
  }
};
