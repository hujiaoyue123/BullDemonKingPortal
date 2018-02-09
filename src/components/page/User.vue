<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>&nbsp系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button @click="userAddRoutes" type="primary" icon="plus" class="handle-del mr10">添加</el-button>
            <el-button type="primary" v-show="false" icon="delete" class="handle-del mr10" @click="handleDeleteAll">
                批量删除
            </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="编号" width="150"></el-table-column>
            <el-table-column prop="name" label="登录名" width="150"></el-table-column>
            <el-table-column prop="realName" label="姓名" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="tableLength">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: 'http://10.10.10.27:8080/rest/sys/findAllUsers.do',//查询所有用户
                urlDel: 'http://10.10.10.27:8080/rest/sys/deleteUserById.do',//删除用户
                tableData: [],
                allClick: true,
                tableDataS: [],
                tableLength: 0,
                deleteArr: []
            }
        },
        created() {
            this.getData();
        },
        computed: {

        },
        methods: {
            getData() {
                let self = this;
                let params = new URLSearchParams();//json格式转普通方式
                params.append('pageIndex', 1);
                params.append('pageSize', 10);
                self.$axios.post(self.url,params).then((res) => {
                    self.tableLength = res.data.meta.rows.length;
                    for (let i = 0; i < self.tableLength; i += 10) {
                        self.tableDataS.push(res.data.meta.rows.slice(i,i+10))
                    }
                    self.tableData = self.tableDataS[0];
                    console.log(self.tableData);
                });
            },
            handleCurrentChange(val) {
                let self = this;
                self.tableData = self.tableDataS[val - 1];
            },
            userAddRoutes() {
                this.$router.push({
                    path: 'user-add',
                });
            },
            handleDelete(row, index) {
                let self = this;
                for (let i = 0; i < self.deleteArr.length; i++) {
                    if (self.deleteArr[i].name == row.name) {
                        self.tableData.splice(index, 1)
                        let params = new URLSearchParams();//json格式转普通方式
                        params.append('userId', row.id);
                        self.$axios.post(self.urlDel, params).then((res) => {
                            alert('已删除');
                        })
                    }
                }
            },
            handleEdit(row) {
                console.log(row);
                this.$router.push({
                    path: 'user-add',
                    query: row
                });
            },
            handleSelectionChange(val) {
                let self = this;
                self.deleteArr = val;
            },
            handleDeleteAll() {
                let self = this;
                self.allClick = false;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>
