const { 
  getEventsController,
  getEventController,
  createEventController,
  updateEventController } = require('../../controllers/events');

const eventRoutes = [
  {
    method: 'GET',
    path: '/events',
    handler: (request, h) => {
      return getEventsController(request, h);
    }
  },
  {
    method: 'GET',
    path: '/event/{id}',
    handler: (request, h) => {
      return getEventController(request, h);
    }
  },
  {
    method: 'POST',
    path: '/event',
    handler: (request, h) => {
      return createEventController(request, h);
    }
  },
  {
    method: 'PATCH',
    path: '/event/{id}',
    handler: (request, h) => {
      return updateEventController(request, h);
    }
  },
];

module.exports = eventRoutes;