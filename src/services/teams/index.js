const db = require('../../../database/models');
const Boom = require('@hapi/boom');

const getTeams = async (userEmail) => {
  const teams = await db.Team.findAll({
    where: {
      empNos: {
        [db.Sequelize.Op.contains]: [userEmail]
      }
    }
  });
  return teams;
};

const createTeam = async (empNos, description) => {
  try {
    const team = await db.Team.create({ empNos, description });
    return team;
  } catch (error) {
    throw Boom.badRequest('Error creating team', error);
  }
};

const addEmpNos = async (teamId, empNos) => {
  try{
    const team = await db.Team.findByPk(teamId);
    const newEmpNos = [...team.empNos, ...empNos];
    await team.update({ empNos: newEmpNos });
    return team;
  } catch (error) {
    throw Boom.badRequest('Error adding employees to team', error);
  }
};

const removeEmpNos = async (teamId, empNos) => {
  try{
    const team = await db.Team.findByPk(teamId);
    const newEmpNos = team.empNos.filter((empNo) => !empNos.includes(empNo));
    await team.update({ empNos: newEmpNos });
    return team;
  } catch (error) {
    throw Boom.badRequest('Error removing employees from team', error);
  }

};

const dropTeam = async (teamId) => {
  try {
    const team = await db.Team.findByPk(teamId);
    await team.destroy();
    return team;
  } catch (error) {
    throw Boom.badRequest('Error dropping team', error);
  
  }
};

module.exports = {
  getTeams,
  createTeam,
  addEmpNos,
  removeEmpNos,
  dropTeam
};
