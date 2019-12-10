module.exports = (model) => {
    const queryRunner = async ({ filters, pagination, assortment }) => {
        let query = model.find({ ...filters });
        if (Number.isInteger(pagination.offset)) { query = query.skip(pagination.offset) };
        if (Number.isInteger(pagination.limit)) { query = query.limit(pagination.limit) };
        if (assortment.sortBy != '') { query = query.sort({ [assortment.sortBy]: assortment.sortOrder }) };

        const [total, results] = await Promise.all([
            model.find({ ...filters }).countDocuments(),
            query
        ]);
        return { total, offset: pagination.offset, limit: pagination.limit, results };
    }
    return queryRunner;
}