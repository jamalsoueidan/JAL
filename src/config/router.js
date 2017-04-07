import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import { onEnterMiddleware, ensureDataLoaded } from './routerMiddlewares/on_enter.js'

import BarchartExample from 'components/barchart/example'
import DropdownExample from 'components/dropdown/example'
import ListExample from 'components/list/example'
import TableExample from 'components/table/example'
import TableXExample from 'components/table_x/example'
import SplitterExample from 'components/splitter/example'
import GridExample from 'components/grid/example'

const routes = [
  { name: 'application', path: '/'},
  { name: 'application.barchart', path: 'barchart', component: BarchartExample },
  { name: 'application.dropdown', path: 'dropdown', component: DropdownExample },
  { name: 'application.list', path: 'list', component: ListExample },
  { name: 'application.splitter', path: 'splitter', component: SplitterExample },
  { name: 'application.table', path: 'table', component: TableExample },
  { name: 'application.tableX', path: 'tablex', component: TableXExample },
  { name: 'application.grid', path: 'grid', component: GridExample }
];

const router = createRouter(routes, {
  defaultRoute: 'application'
})
.usePlugin(browserPlugin({useHash: true}))
.usePlugin(listenersPlugin())

window.router = router

export { router as default, routes }
