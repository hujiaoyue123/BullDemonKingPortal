<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 视频管理</el-breadcrumb-item>
                <el-breadcrumb-item>平台视频</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button @click="" type="primary" icon="plus" class="handle-del mr10">添加</el-button>
            <el-button @click="" type="primary" icon="edit" class="handle-del mr10">修改</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="">删除</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" label="编号" width="100"></el-table-column>
            <el-table-column prop="date" label="URL" width="150"></el-table-column>
            <el-table-column prop="name" label="时间" width="120"></el-table-column>
            <el-table-column prop="address" label="描述" :formatter="formatter"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        created(){},
        computed:{
            data(){

            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
