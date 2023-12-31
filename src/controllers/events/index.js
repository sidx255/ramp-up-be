const {
  getEvents,
  getEvent,
  getTeamEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../../services/events');

const getEventsController = async (request, h) => {
  const userEmail = request.email;
  const events = await getEvents(userEmail);
  return h.response(events).code(200);
};

const getEventController = async (request, h) => {
  const { id } = request.params;
  const event = await getEvent(id);
  return h.response(event).code(200);
};

const getTeamEventsController = async (request, h) => {
  const { teamId } = request.params;
  const events = await getTeamEvents(teamId);
  return h.response(events).code(200);
};

const createEventController = async (request, h) => {
  const { payload } = request;
  const event = await createEvent(payload);
  return h.response(event).code(201);
};

const updateEventController = async (request, h) => {
  const { id } = request.params;
  const { payload } = request;
  const event = await updateEvent(id, payload);
  return h.response(event).code(200);
};

const deleteEventController = async (request, h) => {
  const { id } = request.params;
  const event = await deleteEvent(id);
  return h.response(event).code(200);
};

module.exports = {
  getEventsController,
  getEventController,
  getTeamEventsController,
  createEventController,
  updateEventController,
  deleteEventController,
};

    