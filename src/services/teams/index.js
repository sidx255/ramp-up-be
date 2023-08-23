const db = require('../../../database/models');

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
  const team = await db.Team.create({ empNos, description });
  return team;
};

const addEmpNos = async (teamId, empNos) => {
  const team = await db.Team.findByPk(teamId);
  const newEmpNos = [...team.empNos, ...empNos];
  await team.update({ empNos: newEmpNos });
  return team;
};

const removeEmpNos = async (teamId, empNos) => {
  const team = await db.Team.findByPk(teamId);
  const newEmpNos = team.empNos.filter((empNo) => !empNos.includes(empNo));
  await team.update({ empNos: newEmpNos });
  return team;
};

const dropTeam = async (teamId) => {
  const team = await db.Team.findByPk(teamId);
  await team.destroy();
  return team;
};

module.exports = {
  getTeams,
  createTeam,
  addEmpNos,
  removeEmpNos,
  dropTeam
};
