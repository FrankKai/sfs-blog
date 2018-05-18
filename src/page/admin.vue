<template>
    <div class="admin">
        <div class="sidebar">
            <blogger></blogger>
            <timestamp></timestamp>
        </div>
        <navigation></navigation>
        <div class="user-body">
            <div class="body-header">
            <el-row :gutter="20">
                <el-col><div class="userList">评论列表</div></el-col>
                <!-- <el-col :span="8"><div class="addUser"><create></create></div></el-col> -->
            </el-row>
            </div>
            <div class="body-content">
            <el-table
                :data="users"
                border>
                <el-table-column
                prop="article"
                label="文章"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="昵称"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="content"
                label="评论"
                width="300"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                label="功能"
                width="80"
                show-overflow-tooltip
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
import update from '../components/admin/update'
import turnoff from '../components/admin/turnoff'
import axiosService from 'util/axios.js';
import navigation from '../components/common/navigation.vue'
import blogger from '../components/blog/blogger.vue'
import timestamp from '../components/blog/timestamp.vue'

export default {
    name: 'admin',
    components:{update,turnoff,navigation,blogger,timestamp},
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
        axiosService({
            method: 'get',
            url:'/comments',            
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
            axiosService({
                method: 'DELETE',
                url:'/delete',
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
        margin: 10px;
        padding:10px;
        clear: both;    
    }
    .user-body{
        width: 70%;
        margin-top:10px;
    }
    .body-header{
        display: inline-block;        
        padding: 10px 0;
        font-weight:bold;
    }
    .userList{
        text-align:left;
    }
    .addUser{
        text-align:right;
    }
    .admin{
        width: 80%;
    }
    .sidebar{
        float:right;
        width: 30%;
    }
</style>