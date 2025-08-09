const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const hashedPassword = bcrypt.hashSync('coder123', 10);

const generateUser = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
    };
};

const generateMockUsers = (quantity) => {
    const users = [];
    for (let i = 0; i < quantity; i++) {
        users.push(generateUser());
    }
    return users;
};

module.exports = { generateMockUsers };