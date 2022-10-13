import HeaderOnly from '../components/Layout/HeaderOnly';

import Home from '.././pages/Home/Home.js';
import Following from '.././pages/Following/Following.js';
import Upload from '.././pages/Upload/Upload.js';
import Profile from '.././pages/Profile/index';

// PublicRoutes
const publicRoutes = [
  { path: '/', component: Home },
  { path: 'following', component: Following },
  { path: '/@:nickname', component: Profile },
  { path: 'upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
