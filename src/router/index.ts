import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import CollectionView from '../views/CollectionView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/workspaces/:id',
    name: 'workspace',
    component: WorkspaceView
  },
  {
    path: '/workspaces/:workspaceId/collections/:collectionId',
    name: 'collection',
    component: CollectionView
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
