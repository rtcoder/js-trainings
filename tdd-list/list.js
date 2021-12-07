/**
 * @description paginate users list
 * @param {array} data
 * @param {number} page
 * @param {number} limit
 * @returns {array}
 */
function paginate(data, page, limit) {
  if (data === null || data === undefined) {
    return null;
  }

  let startIndex = limit * page - limit;
  let endIndex = limit * page;

  if (startIndex > data.length) {
    return null;
  }

  let users = data.slice(startIndex, endIndex);

  if (users === undefined) {
    return null;
  }

  return users;
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
    name: item.firstName,
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
    return null;
  }

  let admins = data.filter((d) => d.isAdmin);

  if (admins === undefined) {
    return null;
  }

  return admins;
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
    return null;
  }

  let users = data.filter(
    (d) =>
      d.firstName.includes(search) ||
      d.lastname === search ||
      d.username.includes(search) ||
      d.email.includes(search)
  );

  if (users === undefined) {
    return null;
  }

  return users;
}

module.exports = {
  paginate,
  mapUser,
  getOne,
  getUsers,
  getAdmins,
  filterUsers,
};
