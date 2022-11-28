</template>

    <div>
        <el-table :data="form" border style="width: 100%" stripe>
            <el-table-column fixed prop="id" label="id" width="50">
            </el-table-column>
            <el-table-column label="Avatar" width="80">
                <template slot-scope="scope">
                    <img v-bind:src="scope.row.avatar" width="40px"/>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="UserName">
            </el-table-column>
            <el-table-column prop="role_id" label="RoleId">
            </el-table-column>
            <el-table-column prop="email" label="Email">
            </el-table-column>
            <el-table-column prop="mobile" label="Mobile" width="180">
            </el-table-column>

           

            <el-table-column fixed="right" label="Action" width="240">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                                title="view ssh machine information"
                                @click="doUpdate(scope.row)"
                                :disabled="scope.row.id == 1"
                                
                                type="success"
                                size="small"
                                icon="el-icon-edit"
                        ></el-button>
                        <el-button
                                title="delete ssh connection"
                                @click="doDelete(scope.row)"
                                :disabled="scope.row.id == 1"
                                type="danger"
                                size="small"
                                icon="el-icon-delete-solid"
                        ></el-button>
                    </el-button-group>

                </template>
            </el-table-column>
        </el-table>
           
           <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
                 <el-form :model="form">
                       <el-form-item label="Id"  label-width="formLabelWidth">
                         <el-input v-model="form.id" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="UserName" label-width="formLabelWidth">
                         <el-input v-model="form.username" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="password" label-width="formLabelWidth">
                         <el-input v-model="form.password" autocomplete="off"></el-input>
                     </el-form-item>
                     <el-form-item label="email" label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                     </el-form-item>
                      <el-form-item label="mobile" label-width="formLabelWidth">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                     </el-form-item>
                     <el-form-item label="avatar" label-width="formLabelWidth">
                       <el-input v-model="form.avatar" autocomplete="off"></el-input>
                     </el-form-item>
                     <el-form-item label="Role" label-width="formLabelWidth">
                     <el-select v-model="form.role_id" placeholder="role">
                        <el-option label="SuperAdmin" :value="2"></el-option>
                         <el-option label="OPS" :value="4"></el-option>
                   
                    </el-select>
                   </el-form-item>
               </el-form>
                 <div slot="footer" class="dialog-footer">
                     <el-button @click="dialogFormVisible = false">Cancel</el-button>
                     <el-button type="primary" @click="handleFormSubmit">Submit</el-button>
                </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
        props: {obj: {type: Object, require: true}, visible: Boolean},

        name: 'ChangUserPwd',
        data() {  
        
            return {
                formLabelWidth: "120",
                dialogFormVisible: false,
                form: {},
               
            };
        },
        mounted(){
            this.doShowUser();

        },
       
       
        methods: {
           
           doUpdate(row) {
                this.form= row;
               
                this.dialogFormVisible = true;
            },
            doShowUser() {
                  let id = localStorage.getItem("id");
                  
                  this.$http.get(`api/user/${id}`).then(res => {
                    if (res) {
                        this.form=res.data;
                        
                        this.$message.success("获取数据成功");
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
                    }
                })
            },
        
        }
        
    };
</script>
<style scoped>


</style>
