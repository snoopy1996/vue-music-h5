import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import store from '../store';
import login from '@/components/login/login';
import main from '@/components/dashboard/dashboard.vue';
import personView from '@/components/personal/personView.vue';
import playListDetail from '@/components/playList/playListDetail.vue';
import rankingList from '@/components/rankingLisk/rankList.vue';
import musicSearch from '@/components/musicSearch/musicSearch.vue';
import dymaic from '@/components/dymaic/dymaic.vue';
import commentPage from '@/components/commentPage/comment.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/main',
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: '/main',
        name: 'main',
        component: main,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/person',
        name: 'person',
        component: personView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/dymaic',
        name: 'dymaic',
        component: dymaic,
        meta: {
          keepAlive: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/playListDetail',
    name: 'playListDetail',
    component: playListDetail,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/rankingList',
    name: 'rankingList',
    component: rankingList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/musicSearch',
    name: 'musicSearch',
    component: musicSearch
  },
  {
    path: '/commentPage',
    name: 'commentPage',
    component: commentPage
  }
];
const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.loginStatus) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
