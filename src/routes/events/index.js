const { 
  getEventsController,
  getEventController,
  createEventController,
  updateEventController,
  deleteEventController, 
} = require('../../controllers/events');

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
  {
    method: 'DELETE',
    path: '/event/{id}',
    handler: (request, h) => {
      return deleteEventController(request, h);
    }
  }
];

module.exports = eventRoutes;