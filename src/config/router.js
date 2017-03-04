import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import transitionPath from 'router5.transition-path';
import store from './store'

const dispatch = (state, action) => {
  return new Promise((resolve, reject) => {
    if(store.getState()[state]) {
      resolve();
      return;
    }

    const unsubscribe = store.subscribe(() => {
      if(store.getState()[state]) {
        unsubscribe();
        resolve();
      }
    })

    store.dispatch(action)
  })
}

const routes = [
  { name: 'application', path: '/', onEnter: (router, store) => dispatch('user', {type: 'add', text: 'jamal'})},
  { name: 'application.id', path: '12' }
];

const router = createRouter(routes, {
  defaultRoute: 'application.id'
})
.usePlugin(browserPlugin({useHash: true}))
.usePlugin(listenersPlugin())
.setDependencies({ store });

const findRouteByName = (routes, routeName) => {
  return routes.find(route => route.name === routeName)
}

const customMiddleware = (routes) => (router, dependencies) => (toState, fromState, next) => {
  const { toActivate } = transitionPath(toState, fromState)
  const onEnterPromises = toActivate.map(routeName => findRouteByName(routes, routeName))
                         .filter(route => typeof route.onEnter === "function")
                         .map(route => route.onEnter(router, dependencies.store))

  return Promise.all(onEnterPromises)
};

router.useMiddleware(customMiddleware(routes));

export default router
