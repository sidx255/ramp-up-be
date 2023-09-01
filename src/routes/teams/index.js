/* eslint-disable no-unused-vars */
const { 
  getTeamsController, 
  createTeamController,
  addEmpNosController,
  removeEmpNosController,
  dropTeamController
} = require('../../controllers/teams');

const teamRoutes = [
  {
    method: 'GET',
    path: '/teams',
    handler: (request, h) => {
      return getTeamsController(request, h);
    }
  },
  {
    method: 'POST',
    path: '/teams/create',
    handler: (request, h) => {
      return createTeamController(request, h);
    }
  },
  {
    method: 'PATCH',
    path: '/team/{id}/addUser',
    handler: (request, h) => {
      return addEmpNosController(request, h);
    }
  },
  {
    method: 'PATCH',
    path: '/team/{id}/removeUser',
    handler: (request, h) => {
      return removeEmpNosController(request, h);
    }
  },
  {
    method: 'DELETE',
    path: '/team/{id}',
    handler: (request, h) => {
      return dropTeamController(request, h);
    }
  }
];

module.exports = teamRoutes;