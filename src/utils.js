
const sort = function sort(array) {
  return array.sort(function (a, b) {
    const typeA = a.toUpperCase();
    const typeB = b.toUpperCase();
    return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
  });
};

const shuffle = function shuffle(startArray) {
  const array = startArray || [];
  for (let i = array.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
  return array.slice(0, 12);
};

const hasActivePromo = function(sitePromos) {
  const promos = sitePromos.filter(({ startDate, endDate }) => {
    const date = new Date();
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    date.setHours(hours - offset);
    const now = date.toISOString();
    return startDate < now && now < endDate;
  });
  return promos[0];
}

module.exports = { sort, shuffle, hasActivePromo };