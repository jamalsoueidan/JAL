import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import { onEnterMiddleware, ensureDataLoaded } from './routerMiddlewares/on_enter.js'

import BarchartExample from 'components/barchart/example'
import DropdownExample from 'components/dropdown/example'
import ListExample from 'components/list/example'

const routes = [
  { name: 'application', path: '/'},
  { name: 'application.barchart', path: 'barchart', component: BarchartExample },
  { name: 'application.dropdown', path: 'dropdown', component: DropdownExample },
  { name: 'application.list', path: 'list', component: ListExample }
];

const router = createRouter(routes, {
  defaultRoute: 'application'
})
.usePlugin(browserPlugin({useHash: true}))
.usePlugin(listenersPlugin())

window.router = router

export { router as default, routes }
