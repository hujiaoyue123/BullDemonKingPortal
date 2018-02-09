<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box handle-title">修改用户</div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline container">
            <el-form-item label="登录名" class="user-input">
                <el-input v-model="formInline.userLoginName" placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="姓名" class="user-input">
                <el-input v-model="formInline.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline container">
            <el-form-item label="用户角色" class="user-input">
                <el-select v-model="formInline.userRegion" placeholder="超级管理员">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="教务" value="教务"></el-option>
                    <el-option label="客服" value="客服"></el-option>
                    <el-option label="线上运维" value="线上运维"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="formInline.userResource" size="medium">
                    <el-radio border label="运营人员"></el-radio>
                    <el-radio border label="业务人员"></el-radio>
                    <el-radio border label="管理员"></el-radio>
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
            <el-button @click="onRoutes('user')"  type="primary" class="handle-del mr10">返回</el-button>
            <el-button type="primary" class="handle-del mr10" @click="reservation">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                /**
                 * 需要修改参数的地方
                 * */
                formInline: {
                    userLoginName: null,
                    userName: null,
                    userResource: '运营人员',
                    userRegion: '超级管理员',
                },
                dialogVisible: false,
                routerObject: {}
            }
        },
        created() {
            /**
             * 需要修改参数的地方
             * */
//            this.formInline = this.getData();
        },
        methods: {
            getData: function () {
                return this.$route.query[0];
            },
            reservation: function () {
                const formInline = this.formInline;
                if (formInline.userLoginName && formInline.userName  && formInline.userRegion) {
                    /**
                     * 往服务器发送参数
                     * */
                    console.log(formInline);
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
