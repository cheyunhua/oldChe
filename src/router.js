import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const vueRouter = new Router({
    $breadCrumbs: ['main'],
    mode: "hash",
    routes: [
        {
            path: "/login",
            name: "login",
            meta: {
                title: "登陆"
            },
            component: () => import("@/components/ViewLogin"),
        }
        ,
        {
            path: "/",
            name: "main",
            meta: {
                title: "主页"
            },

            component: () => import("@/components/Main"),
            //redirect: {name: 'sshList'},
            children: [
                {
                    path: "sftp/:id/:name/:user",
                    name: "sftp",
                    props: true,
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'ssh', title: 'Ssh'}, {
                            name: 'sftp',
                            title: '安全Ftp'
                        }],
                        title: "安全ftp"
                    },
                    component: () => import("@/components/ViewSftp")
                },
                {
                    path: "ssh",
                    name: "ssh",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'ssh', title: 'Ssh/Sftp'}],
                        title: "Ssh/Sftp"
                    },
                    component: () => import("@/components/ViewSsh")
                },
                {
                    path: "term-log",
                    name: "termLog",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'termLog', title: 'SshReplay'}],
                        title: "SshReplay"
                    },
                    component: () => import("@/components/ViewTermLog")
                },
                {
                    path: "user",
                    name: "user",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'user', title: 'User'}],
                        title: "User"
                    },
                    component: () => import("@/components/ViewUser")
                },
                {
                    path: "profile",
                    name: "profile",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'profile', title: 'profile'}],
                        title: "profile"
                    },
                    component: () => import("@/components/Profile")
                },
                {
                    path: "HackNews",
                    name: "HackNews",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'Hacknews', title: 'HackNews'}],
                        title: "HackNews"
                    },
                    component: () => import("@/components/Hacknews")
                },
                {
                    path: "ginbro",
                    name: "ginbro",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'ginbro', title: 'Ginbro'}],
                        title: "Ginbro"
                    },
                    component: () => import("@/components/ViewGinbro")
                },
                {
                    path: "nes",
                    name: "nes",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'nes', title: 'Nes'}],
                        title: "NES"
                    },
                    component: () => import("@/components/ViewNes")
                },
                {
                    path: "Wslog-msg-rt",
                    name: "WslogMsgRt",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'ViewWslogMsgRt', title: 'ViewWslogMsgRt'}],
                        title: "wslog msg real time"
                    },
                    component: () => import("@/components/ViewWslogMsgRt")
                },
                {
                    path: "wslog-msg-hi",
                    name: "wslogMsgHi",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'ViewWslogMsgHi', title: 'ViewWslogMsgHi'}],
                        title: "wslog msg history"
                    },
                    component: () => import("@/components/ViewWslogMsgHi")
                },
                {
                    path: "wslog/channel",
                    name: "wslogChannel",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'slog', title: 'slog'}],
                        title: "wslog channel"
                    },
                    component: () => import("@/components/ViewWslogChannel")
                },
                {
                    path: "wslog/hook",
                    name: "wslogHook",
                    meta: {
                        breads: [{name: 'main', title: 'Home'}, {name: 'slog', title: 'slog'}],
                        title: "wslog hook"
                    },
                    component: () => import("@/components/ViewWslogHook")
                }
            ]
        }
    ]
});


export default vueRouter;
