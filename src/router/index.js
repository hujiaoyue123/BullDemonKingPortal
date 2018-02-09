import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            //重定向
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/readme',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/user-add',
                    component: resolve => require(['../components/page/User-add.vue'], resolve),    // Vue-Quill-Editor组件
                    name: 'UserAdd'
                },
                {
                    path: '/user-change',
                    component: resolve => require(['../components/page/User-change.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/Role.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/basecharts.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/role-add',
                    component: resolve => require(['../components/page/Role-add.vue'], resolve),    // Vue-Quill-Editor组件
                    name: 'RoleAdd'
                },
                {
                    path: '/role-change',
                    component: resolve => require(['../components/page/Role-change.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/resource',
                    component: resolve => require(['../components/page/Resource.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/video',
                    component: resolve => require(['../components/page/Video.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
