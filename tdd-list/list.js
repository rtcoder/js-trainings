/**
 * @description paginate users list
 * @param {array} data
 * @param {number} page
 * @param {number} limit
 * @returns {array}
 */
function paginate(data, page, limit) {
  if (data === null || data === undefined) {
    return [];
  }

  let startIndex = limit * page - limit;
  let endIndex = limit * page;

  if (startIndex > data.length) {
    return [];
  }

  return data.slice(startIndex, endIndex);
}

/**
 * @description map user model and return only id, name, email, address and formatted phone number
 * @param {object} item
 * @returns {object}
 */
function mapUser(item) {
  if (item === null || item === undefined) {
    return null;
  }

  let user = {
    id: item.id,
    name: `${item.firstName}, ${item.lastName}`,
    email: item.email,
    address: `${item.address.city}, ${item.address.country}`,
    phone: item.phone
      .replace(/[^\d]/g, "")
      .replace(/([0-9]{3})([0-9]{7})/, "($1) $2"),
  };

  return user;
}

/**
 * @description get single user by ID
 * @param {array} data
 * @param {number} id
 * @returns {object|null}
 */
function getOne(data, id) {
  if (data === null || data === undefined) {
    return null;
  }

  let user = data.find((d) => d.id === id);

  if (user === undefined) {
    return null;
  }

  return user;
}
/**
 * @description get users from API
 * @returns {Promise<array>}
 */
function getUsers() {
  const USERS_API_URL = "https://rtcoder.github.io/fake-api/users.json";
  return fetch(USERS_API_URL).then((res) => res.json());
}

/**
 * @description get only admin users
 * @param {array} data
 * @returns {array}
 */
function getAdmins(data) {
  if (data === null || data === undefined) {
    return [];
  }

  return data.filter((d) => d.isAdmin);
}

/**
 * @description filter users by name, surname email and username
 * @param {array} data
 * @param {string} search
 * @returns {array}
 */
function filterUsers(data, search) {
  if (
    (data === null || data === undefined) &&
    (search === null || search === undefined)
  ) {
    return [];
  }

  return data.filter(
    (d) =>
      d.firstName.includes(search) ||
      d.lastName.includes(search) ||
      d.username.includes(search) ||
      d.email.includes(search)
  );
}

module.exports = {
  paginate,
  mapUser,
  getOne,
  getUsers,
  getAdmins,
  filterUsers,
};
