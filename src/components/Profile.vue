<template>
    <div>
            <el-form :model="form">
                <el-form-item label="UserName"  label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="password"  label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" :placeholder="$t('password')"></el-input>
                </el-form-item>
                <el-form-item label="email"  label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="mobile"  label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="avatar"  label-width="formLabelWidth">
                    <el-input v-model="form.avatar" autocomplete="off" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="Role"  label-width="formLabelWidth">
                    <el-select v-model="form.role_id" placeholder="role">
                        <el-option label="SuperAdmin" :value="2"></el-option>
                         <el-option label="OPS" :value="4"></el-option>
                        <el-option label="Dev" :value="8"></el-option>
                        <el-option label="Test" :value="16"></el-option>
                      
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleFormSubmit" >Submit</el-button>
            </div>
        

    </div>

</template>

<script>

    export default {
        name: 'ViewUser',
        data() {
            return {
                formLabelWidth: "80",
                dialogFormVisible: false,
            
                form: {

                },
            };
        },
        mounted() {
            this.doShowUser();
        },
        created() {
        },
        methods: {
         
            
            doShowUser() {
                  let id = localStorage.getItem("id");
                  
                  this.$http.get(`api/user/${id}`).then(res => {
                    if (res) {
                        this.form=res.data;
                        
                        //this.$message.success("获取数据成功");
                    }
                })
                
            },
         
            handleFormSubmit() {
                let method = 'post';
                let url = 'api/user';
                if (this.form.id > 0) {
                    method = "patch";
                } else {
                    method = "post"
                }
                let data = this.form;
                this.$http({method, url, data}).then(res => {
                    if (res) {
                        this.$message.success("success");
                        this.dialogFormVisible = false;
                        this.doShowUser()
                    }
                })
            },
            
        }
    };
</script>
<style scoped>


</style>
