import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import transitionPath from 'router5.transition-path';

const routes = [
  { name: 'application', path: '/', onEnter: (resolve) => {
    console.log("dispatch action")
  }},
  { name: 'application.id', path: '12' },
];

const router = createRouter(routes, {
  defaultRoute: 'application.id'
})

//router.usePlugin(loggerPlugin)
router.usePlugin(browserPlugin({
    useHash: true
}));
router.usePlugin(listenersPlugin());

const findRouteByName = (routes, routeName) => {
  return routes.find(route => route.name === routeName)
}

const customMiddleware = (routes) => (router, dependencies) => (toState, fromState, next) => {
    const { toActivate } = transitionPath(toState, fromState)
    const onEnterHandlers = toActivate.map(routeName => findRouteByName(routes, routeName))
                           .filter(route => route.onEnter !== undefined)
                           .map(route => route.onEnter(router, dependencies))

    /*onEnterHandlers.reduce((pre, next) => {
      pre.then(() => console.log(next))
    }, Promise.resolve());

    done();*/

    return new Promise((ful, err) => err()).then(
        res => { console.log('suc') },
        err => { console.log('err') }
    )
};

router.useMiddleware(customMiddleware(routes));

export default router
