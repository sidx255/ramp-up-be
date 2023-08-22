/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        'id': uuidv4(),
        'emp_no': '123323566',
        'email': 's.garule@mail.com',
        'name': 'Siddhant Garule',
        'role': 'Head',
        'contact': '8437251679',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'emp_no': '213323582',
        'email': 'sid1.sharma@gmail.com',
        'name': 'Siddharth Sharma',
        'role': 'Developer',
        'contact': '9876543210',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'emp_no': '218723586',
        'email': 'g.poorsarla@gmail.com',
        'name': 'Gaurav Poorsarla',
        'role': 'Developer',
        'contact': '9988776655',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'emp_no': '345678321',
        'email': 'rahul.k@mail.com',
        'name': 'Rahul K',
        'role': 'Tester',
        'contact': '9876543210',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'emp_no': '345678322',
        'email': 'dinesh@gmail.com',
        'name': 'Dinesh',
        'role': 'Project Manager',
        'contact': '9876543211',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'emp_no': '345678323',
        'email': 'ravi.kant@mail.com',
        'name': 'Ravi Kant',
        'role': 'Developer',
        'contact': '9876543212',
        'created_at': new Date(),
        'updated_at': new Date()
      }
    ], {});

    await queryInterface.bulkInsert('rooms', [
      {
        'id': uuidv4(),
        'name': 'Room 1',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'name': 'Room 2',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'name': 'Room 3',
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'id': uuidv4(),
        'name': 'Room 4',
        'created_at': new Date(),
        'updated_at': new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
