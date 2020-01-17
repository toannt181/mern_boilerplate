module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Toan',
        lastName: 'Dep trai',
        email: 'toantnweb@gmail.com',
        password: '123@@123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
