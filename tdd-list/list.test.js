const {getUsers, paginate, getOne, getAdmins, filterUsers} = require('./list.js');
const {mapUser} = require("./list");

const data = {
    users: [],
    todos: []
}

test('test get users', async () => {
    data.users = await getUsers();
    expect.arrayContaining(data.users);
    expect(data.users.length).toBeGreaterThan(0);
});

test('test get user', () => {
    const user = getOne(data.users, 1);
    expect(user).not.toBeNull();
    expect(user).toHaveProperty('id', 1);
});

test('test fail get user', () => {
    const user = getOne(data.users, 99999);
    expect(user).toBeNull();
});

test('test paginate', () => {
    const page = paginate(data.users, 2, 30);
    expect(page.length).toBe(30);
    expect(page[0].id).toBe(data.users[31].id);
});

test('test getAdmins', () => {
    const admins = getAdmins(data.users);
    expect(admins.length).toBeGreaterThan(0);
    const notAdmins = admins.filter(({isAdmin}) => !isAdmin);
    expect(notAdmins.length).toBe(0);
});

test('test filterUsers', () => {
    const filtered1 = filterUsers(data.users, 'Maurice');
    expect(filtered1.length).toBe(1);
    const [user1] = filtered1;
    expect(user1.firstName).toBe('Maurice');
    expect(user1.lastName).toBe('Metz');

    const filtered2 = filterUsers(data.users, 'Georgiana36');
    expect(filtered2.length).toBe(1);
    const [user2] = filtered2;
    expect(user2.email).toBe('Georgiana36@hotmail.com');

    const filtered3 = filterUsers(data.users, 'Steve_Bashirian50');
    expect(filtered3.length).toBe(1);
    const [user3] = filtered3;
    expect(user3.username).toBe('Steve_Bashirian50');

    const filtered4 = filterUsers(data.users, 'Jac');
    expect(filtered4.length).toBe(4);
});


test('test mapUser', () => {
    const user = getOne(data.users, 1);
    const mappedUser = mapUser(user);

    expect(mappedUser).toHaveProperty('id', user.id);
    expect(mappedUser).toHaveProperty('name', user.name);
    expect(mappedUser).toHaveProperty('email', user.email);
    expect(mappedUser).toHaveProperty('address', `${user.address.city}, ${user.address.country}`);
    expect(mappedUser).toHaveProperty('phone');
    expect([mappedUser.phone]).toEqual(
        expect.arrayContaining([expect.stringMatching(/^([\d\s()]+)$/)])
    );
});
