<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}

                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}

                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '控制台'
                    },{
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'user',
                                title: '用户管理'
                            },
                            {
                                index: 'role',
                                title: '角色管理'
                            },
                            {
                                index: 'resource',
                                title: '权限管理'
                            }
                        ]
                    }
                    ,{
                      icon: 'el-icon-b-video',
                      index: '3',
                      title: '视频管理',
                      subs: [
                          {
                              index: 'video',
                              title: '平台视频'
                          }, {
                              index: 'video-Third',
                              title: '第三方视频'
                          },

                           ]
                       },{
                        icon: 'el-icon-date',
                        index: 'card',
                        title: '帖子管理',
                        subs: [
                            {
                                index: '',
                                title: '平台帖子'
                            }, {
                                index: '',
                                title: '用户个人帖子'
                            },{
                                index: '',
                                title: '视频评论'
                            },

                        ]
                    },{
                        icon: 'el-icon-message',
                        index: 'user-manage',
                        title: '用户管理',
                        subs: [
                            {
                                index: '',
                                title: '个人资料'
                            }, {
                                index: '',
                                title: '积分'
                            }
                        ]
                    },{
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '图表'
                    }
                ]
            }
        },
        computed: {
            onRoutes(){
                return this.$route.path.split('-')[0].replace('/', '');
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
