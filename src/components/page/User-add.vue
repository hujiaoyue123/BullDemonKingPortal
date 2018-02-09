<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box handle-title">添加/修改用户</div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline container">
            <el-form-item label="登录名" class="user-input">
                <el-input v-model="formInline.name" placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="姓名" class="user-input">
                <el-input v-model="formInline.realName" placeholder="请输入姓名"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline container">
            <el-form-item label="密码" class="user-input">
                <el-input v-model="formInline.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="编码" class="user-input" v-show="false">
                <el-input v-model="formInline.id" ></el-input>
            </el-form-item>
            <el-form-item label="用户角色" class="user-input">
                <el-select  v-model="tableData.value" @change="roleSelectChange" placeholder="请选择用户角色">
                    <el-option v-for="item in tableData" :label="item.name"  :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="formInline.type" size="medium" @change="getRadioValue">
                    <el-radio border :label="1" checked="true">运营人员</el-radio>
                    <el-radio border :label="2">业务人员</el-radio>
                    <el-radio border :label="0">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span style="text-align: center; width: 100%; display: inline-block">信息填写不完整</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="handle-box bottom">
            <el-button @click="onRoutes('user')" type="primary" class="handle-del mr10">返回</el-button>
            <el-button type="primary" class="handle-del mr10" @click="reservation">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                urlInser: 'http://10.10.10.27:8080/rest/sys/insertUser.do',//插入用户
                urlRole: 'http://10.10.10.27:8080/rest/sys/findAllRoles.do',//获取角色
                urlUpdate: 'http://10.10.10.27:8080/rest/sys/updateUser.do',//修改用户
                formInline: {
                    name: 'aaa',
                    realName: 'aaa',
                    password: 'aaa',
                    type:1,
                    rid:'',
                    id:''
                },
                tableData:[],
                dialogVisible: false
            }
        },
        created() {
            let self=this;
            self.formInline = self.$route.query;
            this.getData();
        },
        methods: {
            roleSelectChange(v){
                let self=this;
                self.formInline.rid=v;
            },
            getData() {
                let self = this;
                self.$axios.get(self.urlRole).then((res) => {
                    for(let i=0;i<res.data.meta.rows.length;i++){
                        self.tableData.push(res.data.meta.rows[i])
                    };
                });
            },
            getRadioValue(value) {//类型type 回调参数 选中的 Radio label 值
                let self = this;
                self.formInline.type = value;
            },
            reservation: function () {
                let self=this;
                const formInline = this.formInline;
                if (formInline.name && formInline.realName && formInline.password && formInline.type) {
                    let params = new URLSearchParams();//json格式转普通方式
                    params.append('name', self.formInline.name);
                    params.append('realName', self.formInline.realName);
                    params.append('rid', self.formInline.rid);
                    params.append('type', self.formInline.type);
                    params.append('password', self.formInline.password);
                    params.append('id', self.formInline.id);
                    if(self.formInline.id){
                        self.$axios.post(self.urlUpdate, params).then(function (response) {
                            alert('修改成功');
                            self.$router.push({
                                path: 'user',
                            });
                        })
                    }else{
                        self.$axios.post(self.urlInser, params).then(function (response) {
                            alert('保存成功');
                            self.$router.push({
                                path: 'user',
                            });
                        })
                    }

                } else {
                    this.dialogVisible = true;
                }
            },
            onRoutes(name) {
                this.$router.push('/' + name);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>
<style>
    .handle-title {
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        height: 40px;
        color: #444444;
        font-weight: bold;
        font-size: 16px;
    }

    .container {
        margin-left: 150px;
    }

    .el-form-item__label {
        width: 80px;
        text-align: right;
    }

    .bottom {
        text-align: center;
        margin-left: -140px;
        margin-top: 30px;
    }

    .el-dialog--small {
        width: 30%;
    }
</style>
