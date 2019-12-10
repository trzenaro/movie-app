const getDefaultSearchFromQuery = (query) => {
  const { limit, offset, sortBy, sortOrder, ...filters } = query;

  const pagination = {};
  if (limit) pagination.limit = parseInt(limit, 10);
  if (offset) pagination.offset = parseInt(offset, 10);

  const assortment = {};
  if (sortBy) {
    assortment.sortBy = sortOrder;
    assortment.sortOrder = sortOrder == 'desc' ? -1 : 1;
  }

  return {
    pagination,
    assortment,
    filters
  }
}

module.exports = {
  getDefaultSearchFromQuery
};
