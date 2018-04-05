<template>
    <div class="admin">
        <div class="user-header">
            <!-- <retrive></retrive> -->
        </div>
        <div class="user-body">
            <div class="body-header">
            <el-row :gutter="20">
                <el-col :span="16"><div class="userList">评论列表</div></el-col>
                <!-- <el-col :span="8"><div class="addUser"><create></create></div></el-col> -->
            </el-row>
            </div>
            <div class="body-content">
            <el-table
                :data="users"
                border
                style="width: 100%">
                <el-table-column
                prop="name"
                label="昵称">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱"
                >
                </el-table-column>
                <el-table-column
                prop="article"
                label="文章"
                >
                </el-table-column>
                <el-table-column
                prop="content"
                label="评论"
                >
                </el-table-column>
                <el-table-column
                label="功能"
                width="300"
                >
                <template scope="scope">
                    <!-- <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><update></update></div> -->
                    <!-- <div @click='handleCopy(scope.$index, scope.row)' class="clearPadding"><copy></copy></div>
                    <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><turnon :finalDelData="finalDelData"></turnon></div>         -->
                    <div @click='deleteComment(scope.$index,scope.row)' class="clearPadding"><turnoff></turnoff></div>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
        <div class="user-footer">
            <div class="block">
                <!-- <pag></pag> -->
            </div>
        </div>
    </div>
</template>
<script>
// 引入CRUD等子组件和mapGetters
// import create from '../components/create'
// import retrive from '../components/retrive'
import update from '../components/admin/update'
// import copy from '../components/copy'
// import turnon from '../components/turnon'
import turnoff from '../components/admin/turnoff'
// import pag from '../components/pag'
// import {mapGetters} from 'vuex'
import Axios from 'axios';

export default {
    name: 'admin',
    components:{update,turnoff},
    created () {

        // this.userName = location.search.substring(10)
        // this.$store.dispatch('limitAdmin',this.userName)
        // this.$store.dispatch('getAllHospital'),
        // this.$store.dispatch('getGroups',this.userName)
        // this.$store.dispatch('getAllDeparts')
    },
    watch: {
        // updateUsername: function () {
        //     this.$store.dispatch("getCurrentUser",this.updateUsername)            
        // },
        // copyUsername:function(){
        //     this.$store.dispatch("getCurrentUser",this.copyUsername)
        // }
    },
    mounted(){
        Axios({
            method: 'get',
            url:'http://localhost:3001/comments',            
            // url: "https://www.easy-mock.com/mock/5aab842b82fe290e7f22d91a/retrive"
        }).then((response) => {
            console.log(response)
            this.users = response.data
            console.log(this)
        })
    },
    // computed:mapGetters({
    //     users:'allUsers',
    //     size:'userSize',
    //     ks:'allKS'
    // }),
    methods: {
        // // 服务update组件
        // handleEdit (index, row) {
        //     console.log(this)
        //     this.updateUsername = row.name
        // },
        // //服务copy组件
        // handleCopy (index, row) {
        //     this.copyUsername = row.name
        // },
        // // 服务turnon/turnoff组件
        // handleDelete (index, row) {
        //     this.deleteIndex = index
        //     this.finalDelData = this.users[this.deleteIndex]
        // },
        deleteComment(index,row){
            console.log(index,row);
            let id = row.id;
            let category = row.category;
            let i = row.index;
            Axios({
                method: 'DELETE',
                url:'http://localhost:3001/delete',
                params: {
                    id:id,
                    category:category,
                    index:i
                }
                // url: 'https://www.easy-mock.com/mock/5aab842b82fe290e7f22d91a/delete/:id'
            }).then((res)=>{
                console.log(res)
            })
        }
    },
    data () {
        return {
            users:[{
                "name": "Frank0",
                "email": "gaokai20100801@gmail.com",
                "article": "foo0",
                "comment": "hi how are you i am fine and you"
            }]
        }
    }
}
</script>

<style scoped>
    .el-col {
    border-radius: 4px;
    }
    .user-header{
    background:#fff;
    padding:10px;
    margin:10px;
    }
    .user-body{
    margin:10px;
    background:#fff;
    }
    .body-header{
    padding:10px;
    font-weight:bold;
    }
    .userList{
    text-align:left;
    padding:10px 15px;
    background:#fff;
    }
    .addUser{
    text-align:right;
    }
</style>