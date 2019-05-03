// export const sort = array => array.sort((a, b) => {
//   const typeA = a.toUpperCase();
//   const typeB = b.toUpperCase();
//   // eslint-disable-next-line no-nested-ternary
//   return (typeA < typeB) ? -1 : (typeA > typeB) ? 1 : 0;
// });

const sort = function sort(array) {
  return array.sort(function (a, b) {
    const typeA = a.toUpperCase();
    const typeB = b.toUpperCase(); // eslint-disable-next-line no-nested-ternary

    return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
  });
};

exports.sort = sort;