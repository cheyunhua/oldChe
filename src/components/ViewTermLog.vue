<template>
    <div>
        <el-table  :data="tableData" border style="width: 100%" stripe>
            <el-table-column fixed prop="id" label="id" width="50"></el-table-column>
            <el-table-column prop="client_ip" label="IP"  align="center">
            </el-table-column>
            <el-table-column prop="log" label="Log Line" width="80" align="center">
                <template slot-scope="scope">
                    {{ViewLogLine(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column  label="Started At" width="180">
                <template slot-scope="scope">
                    {{scope.row.started_at.substr(0,19)}}
                </template>
            </el-table-column>
           <el-table-column   label="Duration" width="120"> 
               <template slot-scope="scope">
                    {{ handleTimeLength(scope.row)+'s'}}
                </template>

               
           </el-table-column>
                  
            <el-table-column prop="created_at" label="Created At" width="180">
                <template slot-scope="scope">
                    {{scope.row.created_at.substr(0,19)}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="180" align="center">
                <template slot-scope="scope">
                
                    <el-button
                            type="small"
                            size="small"
                            title="view machine information"
                            @click="doView(scope.row)"
                            icon="el-icon-view"
                    >
                    </el-button>
                   
                    <el-button 
                                type="small"
                                size="small"
                                title="delete a row"
                                @click="doDelete(scope.row)"
                                icon="el-icon-delete-solid">
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="margin-top: 20px"
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page="page"
                :page-sizes="[10,15, 30, 45, 60]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    
         
        <comp-term-out :log="selectedLog" :visible="termVisible" @pclose="doClose"></comp-term-out>
    </div>
</template>
<script>
    
    import CompTermOut from "./CompTermOut";
    import moment from 'moment';
    
    
    


    export default {
        components: {CompTermOut},
        name: 'ViewTermLog',

        data() {
            return {
                selectedRow: {},
                termVisible: false, 
                selectedLog: "",
                dialogInfoVisible: false,
                total: 0,
                page: 1,
                size: 10,
                tableData: [],
                q: "",
            };
        },
     
        mounted() {
            this.fetchAllUser();

            
        },



        created() {
        },
        methods: {
            doClose(flag) {
                this.termVisible = flag
            },
             handleTimeLength(row) {
                 let timeLength = moment(row.created_at).diff(row.started_at, "seconds"); 
                 return timeLength;
      },

            pageChange(val) {
                this.page = val;
                this.fetchAllUser()
            },
            sizeChange(val) {
                this.page = 1;
                this.size = val;
                this.fetchAllUser()
            },

            fetchAllUser() {
                let page = this.page;
                let size = this.size;
                let where = '';
                this.$http
                    .get("api/ssh-log", {params: {where, page, size}})
                    .then(resp => {
                        if (resp) {
                            this.total = resp.total;
                            this.size = resp.size;
                            this.page = resp.page;
                            this.tableData = resp.data
                        }

                    })
            },
  
        
            doView(row) {
               // this.doMark()
         
                this.selectedRow = row;
                this.selectedLog= row.log.replace(/\r/gi, "\r\n");
                
                
               
               
                
                //this.selectedLog = row.log
                this.termVisible = true;
               // this.dialogInfoVisible = false;
            },
             ViewLogLine(row) {
            
                 let line = row.log;
                 let linenumber = line.split('\n').length;
                 return linenumber;
            },
        

            doDelete(row) {
                this.selectedRow = row;
                this.$http.delete(`api/ssh-log/${row.id}`).then(res => {
                    if (res) {
                        this.fetchAllUser();
                        this.$message.success(res.msg);
                        this.dialogInfoVisible = false;
                    }
                })
            }
        },
    };
</script>
