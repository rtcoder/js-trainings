/**
 * @description paginate users list
 * @param {array} data
 * @param {number} page
 * @param {number} limit
 * @returns {array}
 */
function paginate(data, page, limit) {
    return [];
}

/**
 * @description map user model and return only id, name, email, address and formatted phone number
 * @param {object} item
 * @returns {object}
 */
function mapUser(item) {
    return item;
}

/**
 * @description get single user by ID
 * @param {array} data
 * @param {number} id
 * @returns {object|null}
 */
function getOne(data, id) {
    return null;
}

/**
 * @description get users from API
 * @returns {Promise<array>}
 */
function getUsers() {
    const USERS_API_URL = 'https://rtcoder.github.io/fake-api/users.json';
    return fetch(USERS_API_URL).then(res => res.json());
}

/**
 * @description get only admin users
 * @param {array} data
 * @returns {array}
 */
function getAdmins(data) {
    // code here
    return [];
}

/**
 * @description filter users by name, surname email and username
 * @param {array} data
 * @param {string} search
 * @returns {array}
 */
function filterUsers(data, search) {
    // code here
    return [];
}

module.exports = {
    paginate,
    mapUser,
    getOne,
    getUsers,
    getAdmins,
    filterUsers,
}
