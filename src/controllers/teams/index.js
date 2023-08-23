/* eslint-disable no-unused-vars */
const { getTeams, createTeam, addEmpNos, removeEmpNos, dropTeam } = require('../../services/teams');

const getTeamsController = async (request, h) => {
  const userEmail = request.email;
  const teams = await getTeams(userEmail);
  return teams;
};

const createTeamController = async (request, h) => {
  const { empNos, description } = request.payload;
  return createTeam(empNos, description);
};

const addEmpNosController = async (request, h) => {
  const teamId = request.params.id;
  const { empNos } = request.payload;
  return addEmpNos(teamId, empNos);
};

const removeEmpNosController = async (request, h) => {
  const teamId = request.params.id;
  const { empNos } = request.payload;
  return removeEmpNos(teamId, empNos);
};

const dropTeamController = async (request, h) => {
  const teamId = request.params.id;
  return dropTeam(teamId);
};

module.exports = {
  getTeamsController,
  createTeamController,
  addEmpNosController,
  removeEmpNosController,
  dropTeamController
};