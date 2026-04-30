const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getPagination = (query, options = {}) => {
  const defaultLimit = options.defaultLimit || 25;
  const maxLimit = options.maxLimit || 100;
  const page = parsePositiveInt(query.page, 1);
  const requestedLimit = parsePositiveInt(query.limit, defaultLimit);
  const limit = Math.min(requestedLimit, maxLimit);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const getPaginationMeta = ({ page, limit, total }) => ({
  page,
  limit,
  total,
  pages: Math.max(Math.ceil(total / limit), 1),
});

module.exports = { getPagination, getPaginationMeta };
