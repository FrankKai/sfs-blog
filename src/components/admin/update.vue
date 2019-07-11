<template>
<div class="update">
    <el-button type="info" size="small" @click="initData()">修改</el-button>

    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
        <el-form :model="createCurrentUser" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="createCurrentUser.name" auto-complete="off" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户说明" :label-width="formLabelWidth">
            <el-input v-model="createCurrentUser.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户口令" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="createCurrentUser.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" :label-width="formLabelWidth">
            <el-select v-model="createCurrentUser.enable" placeholder="请选择启用状态">
                    <el-option label="启用" value="Y"></el-option>
                    <el-option label="不启用" value="N"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属机构" :label-width="formLabelWidth" required>
            <el-select v-model="createCurrentUser.fy" placeholder="请选择" @change="getDeparts" clearable filterable multiple>
                <el-option
                    v-for="item in allHos"
                    :key="item.key"
                    :label="item.value"
                    :value="item">
                </el-option>
                
            </el-select>
        </el-form-item>
        <el-form-item label="所属科室" :label-width="formLabelWidth">
            <el-select v-model="createCurrentUser.ks" placeholder="请选择" clearable filterable multiple>  
                <el-option
                    v-for="item in ks"
                    :key="item.key"
                    :label="item.value"
                    :fyKey="item.fyKey"
                    :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属组" :label-width="formLabelWidth">
            <el-select v-model="createCurrentUser.groups" placeholder="请选择" clearable filterable multiple>
                <el-option
                v-for="item in groups"
                :key="item.key"
                :label="item.value"
                :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate()">取 消</el-button>
        <el-button type="primary" @click="updateUser(createCurrentUser)">确 定</el-button>
        </div>
    </el-dialog>
    </div>  
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'update',
    template: '<update/>',
    computed:{
        ...mapGetters({
            allHos:'currentAdminHoss',
            ks:'drillHos',
            groups:'groups',
            createCurrentUser:'currentUser',
            update:"update",
            search:"search"
            // ks:'allKS'
        })
    },
    methods: {
        initData:function(){
            this.dialogFormVisible = true
        },
        updateUser:function(userForm){
                console.log(this)
                this.userName = location.search.substring(10)
                if(this.createCurrentUser.password&&this.createCurrentUser.name&&this.createCurrentUser.fy.length>0){
                    this.dialogFormVisible = false
                    this.pageNum = this.$store.getters.page
                    this.$store.dispatch('postUpdateUser',{user:this.createCurrentUser,num:this.pageNum,username:this.userName,searchName:this.search.name,
                        success:()=>{
                        this.$message({
                            type: 'success',
                            message: this.update.status
                        })
                        },
                        fail:()=>{
                            this.$message({
                                type: 'error',
                                message: this.update.status
                            })
                        }
                    })
                }else{
                this.$message({
                    type: 'error',
                    message: '请确认用户名、密码、所属机构是否正确!'
                })
            }
        },
        cancelUpdate:function(){
            this.dialogFormVisible=false
            this.$message({
                type: 'info',
                message: '修改取消!'
            })
        },
        getDeparts:function(value){
            this.$store.dispatch("drillHos",value)
        }
    },
    data () {
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        userForm:{
            name:"bitester3",
            password:"bitester2",
            description:"test user2",
            enable:"N",
            manager:"N",
            fy:[{key:"2",value:"XX医院"},{key:"3",value:"XX市第三人民医院"}],
            ks:[{key:"2_202",value:"XX门诊1",fyKey:"2"},{key:"3_1113_OLD",value:"XX全科",fyKey:"3"},{key:"3_1114_OLD",value:"XX科",fyKey:"3"}],
            groups:[{key:"BIConsumers",value:"BIConsumers"},{key:"FYLevelUsers",value:"FYLevelUsers"},{key:"BIAuthors",value:"BIAuthors"},{key:"QuLevelUsers",value:"QuLevelUsers"}]
        },
        formLabelWidth: '100px',
        rules: {
            name: [
                { required: true, message: '请输入用户名称', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户密码', trigger: 'blur' }
            ]
        },
        pageNum:0,
        userName:''
    }
    }
}
</script>
<style scoped>
</style>