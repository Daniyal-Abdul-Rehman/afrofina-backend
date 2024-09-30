const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const jobRoute = require('./job.route')
const serviceRoute =require('./service.route')
const chatRoute =require('./chat.route')
const assistanceRoute=require('./assistance.route')
const paymentRoute=require('./payment.route')
const orderRoute=require('./order.route')
const reviewRoute=require('./review.route')
const resolutionRoute=require('./resolution.route')
const bidRoute=require('./bid.route')
const invitationRoute=require('./invitation.route')
const eventRoute=require('./event.route')
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/job',
    route: jobRoute,
  },
  {
    path: '/service',
    route: serviceRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/assistance',
    route: assistanceRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path:'/reviews',
    route:reviewRoute
  },
  {
    path:'/resolution',
    route:resolutionRoute
  },
  {
    path:'/event',
    route:eventRoute
  },
  {
    path:'/invitation',
    route:invitationRoute
  },
  {
    path:'/bid',
    route:bidRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
