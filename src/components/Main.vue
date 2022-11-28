<template>
 <div>
    <el-container>
        <el-aside width="200">
            <el-menu :default-openeds="['1','2','3','4','5']" router>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-user"></i>{{ $t('dash.user') }}</template>
                    <el-menu-item-group>
                        <template slot="title">{{ $t('dash.UserM') }}</template>
                        <el-menu-item index="/user">{{ $t('dash.UserList') }}</el-menu-item>
                        <el-menu-item index="/Profile">{{ $t('dash.profile') }}</el-menu-item>
                        <el-menu-item index="/Hacknews">{{ $t('dash.HackNews') }}</el-menu-item>

                    </el-menu-item-group>

                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>{{ $t('dash.Ssh') }}</template>
                    <el-menu-item-group>
                        <template slot="title">{{ $t('dash.SshHelp') }}</template>
                        <el-menu-item index="/ssh">{{ $t('dash.SshSftp') }}</el-menu-item>
                        <el-menu-item index="/term-log">{{ $t('dash.SshLog') }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-rank"></i>Ginbro</template>
                    <el-menu-item-group>
                        <template slot="title">RESTful Cli</template>
                        <el-menu-item index="/ginbro">Generate</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-rank"></i>Nes</template>
                    <el-menu-item-group>
                        <template slot="title">Nes</template>
                        <el-menu-item index="/nes">Nes</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-message"></i>wslog</template>
                    <el-menu-item-group>
                        <template slot="title">Websocket Log</template>
                        <el-menu-item index="/Wslog/channel">Channel</el-menu-item>
                        <el-menu-item index="/wslog/hook">Hook</el-menu-item>
                        <el-menu-item index="/Wslog-msg-rt">MsgRt</el-menu-item>
                        <el-menu-item index="/Wslog-msg-hi">MsgHi</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
       
        

        <el-container style="height: 100vh">
            <el-header>
                <el-breadcrumb separator="/">
                    <template v-if="breads">
                        <el-breadcrumb-item v-for="bc in breads" :key="bc.name" :to="{ name: bc.name }">{{bc.title}}
                        </el-breadcrumb-item>
                    </template>
                </el-breadcrumb>

                <div class="header-addons">
                    <!--change lange-->
                    <el-dropdown>

                        <span v-text="lang" style="margin-right: 2rem;"
                        > </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-link @click="changeLang('zh')" type="success">中文</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-link @click="changeLang('us')" type="danger">English</el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-tooltip content="Help" placement="top">
                        <el-link icon="el-icon-question" class="addon-icon" :underline="false" target="_blank"
                                 href="https://github.com/cheyunhua/laoche"></el-link>
                    </el-tooltip>

                    <el-tooltip content="Feedback" placement="top">
                        <el-link icon="el-icon-s-comment" class="addon-icon" :underline="false" target="_blank"
                                 href="https://join.slack.com/t/360-co/"></el-link>
                    </el-tooltip>
               


                    <!--用户-->
                    <el-dropdown>

                      <!--  <img v-if="user" :src="user.avatar"
                             style="width: 40px;height: 40px;border: 1px solid #d6d6d6;border-radius: 20px"
                             title="user.username">   -->
                        <span v-text="user" style="width: 40px;height: 40px;border: 1px solid #d6d6d6;border-radius: 20px"></span> 

                       
                        

                        <i v-if="!user" class="el-icon-setting"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-link @click="doLogout" type="danger">Logout</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-link :href="'mailto:cheyunhua@sina.com'" v-text="'发送作者邮箱'" type="primary"></el-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-link href="https://github.com/cheyunhua/laoche" v-text="'Github'" type="success"></el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </el-header>
            <el-main id="LaoChe">
                
                <router-view></router-view>
                
                
            </el-main>
            <!--<el-footer height="30">-->
            <!--<p>Felix's frontend and backend are created by Eric Zhou</p>-->
            <!--<p>more about felix-->
            <!--<el-link type="primary" href="//github.com/dejavuzhou/felix">github.com/dejavuzhou/felix</el-link>-->
            <!--</p>-->
            <!--</el-footer>-->
        </el-container>
        
         
    </el-container>
    <!--<chang-user-pwd> :obj="thisForm" :dialogFormVisible="FormVisible"</chang-user-pwd> -->
   
 </div>
     
</template>

<script>
    
    export default {
        
        name: "Main",
         
        data() {
            
            return {
                lang: "中文",
               
            }
        },
        
        computed: {
            user() {
                let js = localStorage.getItem("username");
            
                if (!js) {
                    return {email: "cheyunhua@gmail.com", username: 'LaoChe'}
                }
                return js || {email: "cheyunhua@gmail.com"}
            },
            breads() {
                return this.$route.meta.breads || null;
            }
        },
        beforeUpdate() {
            window.document.title = this.$route.meta.title || "LaoChe"
        },
        
        created() {
        },
        methods: {
            changeLang(lang) {
                this.$i18n.locale = lang;
                if (lang === 'zh') {
                    this.lang = '中文'
                } else if (lang === 'en') {
                    this.lang = 'English'
                }
            },
            
                
        
            doLogout() {
                
                localStorage.removeItem("token");
                localStorage.removeItem("expire_ts");
                localStorage.removeItem("expire");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                this.$router.push({name: "login"});
            }
        },
          
     
            
         
                  
        mounted() {
            
            
            if (this.$route.path === '/') {
                this.$router.push({name: 'ssh'})
            }
            
        }
    }
</script>

<style>
    .header-addons {
        display: flex;
        align-items: center;
    }

    .addon-icon > i {
        margin: auto 20px auto auto;
        font-size: 22px;
    }

</style>