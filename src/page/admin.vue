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
        </el-row>
      </div>
      <div class="body-content">
        <el-table :data="users" border>
          <el-table-column
            prop="article"
            label="文章"
            show-overflow-tooltip
            width="300"
          >
          </el-table-column>
          <el-table-column prop="name" label="昵称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="comment"
            label="评论"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="功能" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="clearPadding">
                <el-button
                  type="danger"
                  @click="deleteHandler(scope.$index, scope.row)"
                  size="small"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import update from "../components/admin/update";
import turnoff from "../components/admin/turnoff";
import axiosService from "util/axios.js";
import navigation from "../components/common/navigation.vue";
import blogger from "../components/blog/blogger.vue";
import timestamp from "../components/blog/timestamp.vue";

export default {
  name: "admin",
  components: { update, turnoff, navigation, blogger, timestamp },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      axiosService({
        method: "get",
        url: "/comments"
      }).then(response => {
        this.users = response.data;
      });
    },
    deleteComment(index, row) {
      let id = row.id;
      let category = row.category;
      let i = row.index;
      axiosService({
        method: "DELETE",
        url: "/delete",
        params: {
          id: id,
          category: category,
          index: i
        }
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // 等待接口处理
        setTimeout(() => {
          this.getComments();
        }, 1000);
      });
    },
    deleteHandler(index, row) {
      this.$confirm("此操作将删除该评论" + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteComment(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  data() {
    return {
      users: [
        {
          name: "Frank0",
          email: "gaokai20100801@gmail.com",
          article: "foo0",
          comment: "hi how are you i am fine and you"
        }
      ]
    };
  }
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.user-header {
  margin: 10px;
  padding: 10px;
  clear: both;
}
.user-body {
  width: 70%;
  margin-top: 10px;
}
.body-header {
  display: inline-block;
  padding: 10px 0;
  font-weight: bold;
}
.userList {
  text-align: left;
}
.addUser {
  text-align: right;
}
.admin {
  width: 80%;
}
.sidebar {
  float: right;
  width: 30%;
}
</style>
