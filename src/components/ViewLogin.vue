<template>
    <div class="login">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <h2>{{$t('Old')}}</h2>

            <el-form-item prop="user">
                <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"
                          :placeholder="$t('account')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" prefix-icon="" :placeholder="$t('password')"
                          show-password></el-input>
            </el-form-item>
        
            <el-form-item prop="code">
               <el-input
                 v-model="ruleForm.code"
                 auto-complete="off"
                 placeholder="验证码"
                 style="width:60%"
                 float=left;
                >       
               </el-input>
               <img style="position: fixed" float=right :src="codeUrl" @click="getCodeX" class="login-code"/>
              
          </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           style="width:100%;"
                           :loading="loading"
                           v-on:keyup.enter="handleLogin"
                           @click.native.prevent="handleLogin">
                     {{ $t('Login') }}
                </el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

    export default {
       
        data() {
            return {
                loading: false,
                captcha_id: '',
                captcha_value: '',
                codeUrl: '',
                ruleForm: {
                    username: '',
                    password: '',
                    code: '',
                    
                   
                }
            };
        },
        created(){
            this.getCodeX();

        },
      
       
        methods: {
            
            handleLogin() {
                
                this.loading = true;
               // if (this.ruleForm.username==="admin"){
                   //let data = this.ruleForm
                   let captcha_id = this.captcha_id
                   let captcha_value = this.ruleForm.code
                   //{params: {captcha_id,captcha_value},data: {data}}
                    this.$http.post(`api/login?captcha_id=${captcha_id}&captcha_value=${captcha_value}`,this.ruleForm).then(res => {
                    if (res) {        
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("expire_ts", res.data.expire_ts);
                        localStorage.setItem("expire", res.data.expire);
                        localStorage.setItem("username",res.data.username);
                        localStorage.setItem("id",res.data.id);
                        this.$router.push({name: "ssh"});
                    }
                    this.loading = false;
                })

                } ,
           getCodeX() {  
                 this.$http.get('captcha').then(res => {
                    if (res) {        
                        this.codeUrl=res.data.image;
                        this.captcha_id = res.data.id;
                        
                        
                        
                    }
                    
                })

                } 
                
            },
            
    }

</script>


<style scoped>
    div.login > form {
        width: 520px;
        padding: 35px 35px 15px;
        margin: 80px auto;
    }

    form > h2 {
        font-size: 26px;
        font-weight: 400;
        margin: 0 auto 40px;
        text-align: center;
        font-weight: 700;
    }

</style>
