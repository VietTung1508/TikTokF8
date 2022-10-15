import HeaderOnly from '../components/Layout/HeaderOnly';

import Home from '.././pages/Home/Home.js';
import Following from '.././pages/Following/Following.js';
import Upload from '.././pages/Upload/Upload.js';
import Profile from '.././pages/Profile/index';
import Search from '.././pages/Search/index';
import routeConfig from '../config/routes';

// PublicRoutes
const publicRoutes = [
  { path: routeConfig.home, component: Home },
  { path: routeConfig.following, component: Following },
  { path: routeConfig.profile, component: Profile },
  { path: routeConfig.upload, component: Upload, layout: HeaderOnly },
  { path: routeConfig.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
