import transitionPath from 'router5.transition-path';

/*
const routes = [
  { name: 'application', path: '/', onEnter: (store) => ensureDataLoaded(store)('user', {type: 'add', text: 'jamal'})},
  { name: 'application.id', path: '12' }
];

router.setDependencies({ store });
router.useMiddleware(onEnterMiddleware(routes));
*/

const ensureDataLoaded = store => (state, action) => new Promise(resolve => {
  const listener = () => {
    if(store.getState()[state]) {
      resolve();
      unsubscribe();
      return true;
    }
    return false;
  }
  const unsubscribe = store.subscribe(listener)
  if (!listener()) {
    store.dispatch(action)
  }
})

const findRouteByName = (routes, routeName) => {
  return routes.find(route => route.name === routeName)
}

const onEnterMiddleware = (routes) => (router, dependencies) => (toState, fromState) => {
  const { toActivate } = transitionPath(toState, fromState)
  const onEnterPromises = toActivate.map(routeName => findRouteByName(routes, routeName))
                         .filter(route => typeof route.onEnter === "function")
                         .map(route => route.onEnter(dependencies.store))

  return Promise.all(onEnterPromises)
};

export { onEnterMiddleware, ensureDataLoaded }
