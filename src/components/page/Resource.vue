<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>&nbsp系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <span style="margin-right: 20px">菜单树</span>
            <el-button @click="appendTree" type="primary" icon="plus" class="handle-del mr10">添加</el-button>
            <el-button @click="fixTree" v-show="false" type="primary" icon="edit" class="handle-del mr10">修改</el-button>
            <el-button @click="deleteTree" type="primary" icon="delete" class="handle-del mr10">删除</el-button>
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
        <div>
            <el-dialog title="权限信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="父结点Id" :label-width="formLabelWidth">
                        <el-input v-model="form.parentId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" :label-width="formLabelWidth">
                        <el-input v-model="form.iconCls" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input v-model="form.sort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限代码" :label-width="formLabelWidth">
                        <el-input v-model="form.code" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型" :label-width="formLabelWidth">
                        <el-radio-group v-model="form.radio" @change="getRadioValue">
                            <el-radio :label="1">菜单</el-radio>
                            <el-radio :label="2">操作</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="saveTable">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: 'http://10.10.10.27:8080/rest/sys/getAllMenuButton.do',//获取权限树
                urlInser: 'http://10.10.10.27:8080/rest/sys/insertMenu.do',//插入权限树节点
                urlDele: 'http://10.10.10.27:8080/rest/sys/deleteMenu.do',//删除权限树单个节点
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    isLeaf: '',
                },
                dialogFormVisible: false,
                isSelected: false,
                form: {
                    parentId: '',
                    iconCls: '',
                    sort: '',
                    code: '',
                    name: '',
                    radio: 1
                },
                formLabelWidth: '80px'
            };
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                let self = this;
                self.$axios.post(self.url, {}).then(function (response) {
                    self.data = response.data;
                })
            },
            getCheckedNode() {
                let self = this;
                let node = self.$refs.tree.getCheckedNodes();
                if (node) {
                    self.form.parentId = node[0].id;
                    self.isSelected = true;
                } else {
                    self.form.parentId = '';
                }
            },
            fixTree(){
                let self = this;
                if (self.isSelected) {
                    this.dialogFormVisible = true
                } else {
                    alert('请选择结点')
                }
                self.isSelected = false;
            },
            appendTree() {//插入节点
                let self = this;
                if (self.isSelected) {
                    this.dialogFormVisible = true
                } else {
                    alert('请选择结点')
                }
                self.isSelected = false;
            },
            deleteTree() {
                let self = this;
                let params = new URLSearchParams();//json格式转普通方式
                params.append('id', self.form.parentId);
                self.$axios.post(self.urlDele, params).then(function (response) {
                    self.getData();//发送数据成功后重新获取权限树
                });
                self.isSelected = false;
            },
            getRadioValue(value) {//类型radio 回调参数 选中的 Radio label 值
                let self = this;
                self.form.radio = value;
            },
            cancel() {
                let self = this;
                self.dialogFormVisible = false;
                this.$router.go(0);//刷新页面
            },
            saveTable(radio) {
                let self = this;
                if (radio && self.form.parentId && self.form.name && self.form.code && self.form.iconCls && self.form.sort) {
                    let params = new URLSearchParams();//json格式转普通方式
                    params.append('pid', self.form.parentId);
                    params.append('name', self.form.name);
                    params.append('code', self.form.code);
                    params.append('iconCls', self.form.iconCls);
                    params.append('type', self.form.radio);
                    params.append('sort', self.form.sort);
                    self.$axios.post(self.urlInser, params).then(function (response) {
                        self.getData();//发送数据成功后重新获取权限树
                    });
                    self.dialogFormVisible = false;//保存成功关闭dialog弹窗
                    self.form.parentId = '';
                    self.form.name = '';
                    self.form.code = '';
                    self.form.iconCls = '';
                    self.form.radio = '';
                    self.form.sort = '';

                } else {
                    alert('请填写全部信息')
                }
            }
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

    .el-form {
        padding-left: 72px
    }
</style>
