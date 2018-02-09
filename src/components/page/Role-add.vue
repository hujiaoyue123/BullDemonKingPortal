<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <span style="margin-left: 180px">角色信息</span>
            <el-button @click="roleBack" type="primary" class="handle-del mr10 back-role">返回</el-button>
            <el-button @click="appendTree" type="primary"  class="handle-del mr10 save-role">保存</el-button>
        </div>
        <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="true"
            @check-change="getCheckedNode"
            :props="defaultProps">
        </el-tree>
        <el-form style="position: absolute;right: 190px;top:130px" ref="form" :model="form" label-width="80px">
            <el-form-item label="权限编码">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="id" v-show="false">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: 'http://10.10.10.27:8080/rest/sys/getAllMenuButton.do',//获取权限树
                urlInser: 'http://10.10.10.27:8080/rest/sys/insertRole.do',//插入角色
                urlUpdate:'http://10.10.10.27:8080/rest/sys/updateRole.do',//修改单个角色
                data: [],
                form: {
                    name: 'asf',
                    code: 'asf',
                    description: 'asf',
                    id:''
                },
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    isLeaf: '',
                },
                isSelected: false,
                nodeId: ''
            };
        },
        created() {
            let self = this;
            self.form = self.$route.query;
            this.getData();
        },
        methods: {
            roleBack() {
                this.$router.push({
                    path: 'role',
                });
            },
            getData() {
                let self = this;
                self.$axios.post(self.url, {}).then(function (response) {
                    self.data = response.data;
                })
            },
            getCheckedNode() {
                let self = this;
                let node = self.$refs.tree.getCheckedNodes();
                self.isSelected = true;
                let nodeIdArr = [1];
                for (let i = 0; i < node.length; i++) {
                    nodeIdArr.push(node[i].id)
                }
                self.nodeId = nodeIdArr.toString();
            },
            appendTree() {//选节点&&插入
                let self = this;
                if (self.isSelected) {
                    let params = new URLSearchParams();//json格式转普通方式
                    params.append('name', self.form.name);
                    params.append('code', self.form.code);
                    params.append('description', self.form.description);
                    params.append('ids', self.nodeId);
                    params.append('id', self.form.id);
                    if(self.form.id){
                        self.$axios.post(self.urlUpdate, params).then(function (response) {
                            alert('修改成功');
                            self.form.name = '';
                            self.form.code = '';
                            self.form.description = '';
                            self.form.id='';
                            //清除勾选
                            self.$router.push({
                                path: 'role',
                            });
                        });
                    }else{
                        self.$axios.post(self.urlInser, params).then(function (response) {
                            alert('保存成功');
                            self.form.name = '';
                            self.form.code = '';
                            self.form.description = '';
                            self.form.id='';
                            //清除勾选
                            self.$router.push({
                                path: 'role',
                            });
                        });
                    }
                } else {
                    alert('请选择结点')
                }

            },

        }
    };
</script>
<style scoped>
    .table {
        width: 50%;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .save-role,.back-role {
        position: absolute;
        top: 325px;
        right: 220px;
    }
    .back-role{
        right:300px;
    }
</style>
