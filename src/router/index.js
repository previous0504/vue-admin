import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/term',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '团队信息管理' }
                },
                {
                    path: '/startup',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseStartup.vue'),
                    meta: { title: '创业项目管理' }
                },
                {
                    path: '/startupdetails',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/StartupDetails.vue'),
                    meta: { title: '创业项目详情' }
                },
                {
                    path: '/applystartup',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/NewStartup.vue'),
                    meta: { title: '申请创业项目' }
                },
                {
                    path: '/chat',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseChat.vue'),
                    meta: { title: '咨询管理' }
                },
                {
                    path: '/chatdetails',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/ChatDetails.vue'),
                    meta: { title: '咨询详情' }
                },
                {
                    path: '/school',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseSchool.vue'),
                    meta: { title: '学校信息管理' }
                },
                {
                    path: '/student',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseStudent.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/informdetails',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/InformDetails.vue'),
                    meta: { title: '学校通知详情' }
                },
                {
                    path: '/inform',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseInform.vue'),
                    meta: { title: '添加学校通知' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '审批管理' }
                },
                {
                    path: '/auditdetails',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/AduitDetails.vue'),
                    meta: { title: '审批详情' }
                },
                {
                    path: '/info',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseInfo.vue'),
                    meta: { title: '基础设置' }
                },
                {
                    path: '/password',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Password.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
               
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
               
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
