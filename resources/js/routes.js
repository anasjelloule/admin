import Home from './components/admin/Home'
import User from './components/admin/User'
import ExampleComponent from './components/ExampleComponent.vue'
import err404 from './components/err404'
import posts from './components/admin/posts'

export const routes = [{
    path: '/home', component: Home, children: [
        { path: '/anas', component: Home }
    ], name: 'admin'
},
{ path: '/users', component: User, name: 'users' },
{ path: '/posts', component: posts, name: 'posts' },
{ path: '*', component: err404, name: 'err404' }

]