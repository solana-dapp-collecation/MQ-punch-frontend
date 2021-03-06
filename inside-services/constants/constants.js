import { getUUID } from '../get-uuid/get-uuid';

import { DEFAULT_TOURNAMENTS_SCREEN_ROUTE } from './events';

export const SERVER_URL = 'http://localhost:8080';

// in miliseconds ( one hour )
export const refreshTokenCoolDown = 60 * 60 * 1000;

export const START_PERIOD_YEAR = 2021;
export const YEARS_RANGE = 10;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const bigHeaderMenuLinks = [
  { label: 'Market', id: getUUID(), pathname: '/market' },
  {
    label: 'Tournaments',
    id: getUUID(),
    pathname: DEFAULT_TOURNAMENTS_SCREEN_ROUTE,
  },
  { label: 'Gym', id: getUUID(), pathname: '/gym' },
  {
    label: 'Leaderboard',
    id: getUUID(),
    pathname: '/leaderboard',
  },
  { label: 'Learn', id: getUUID(), pathname: '/learn' },
];
