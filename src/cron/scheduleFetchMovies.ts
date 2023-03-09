const cron = require('node-cron');
const filmService = require('../services/films');

const schedule = '0 */3 * * *';

function scheduleFetchMovies() {
  cron.schedule(schedule, filmService.saveMovies);
}

module.exports = scheduleFetchMovies;