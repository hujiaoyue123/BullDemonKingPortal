webpackJsonp([5], {
    1015: function (e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            data: function () {
                return {
                    urlInser: "http://10.10.10.27:8080/rest/sys/insertUser.do",
                    urlRole: "http://10.10.10.27:8080/rest/sys/findAllRoles.do",
                    formInline: {
                        userLoginName: null,
                        userName: null,
                        userPassword: null,
                        userResource: "运营人员",
                        userRegion: "超级管理员",
                        radio: ""
                    },
                    tableData: [],
                    dialogVisible: !1
                }
            }, created: function () {
                this.getData()
            }, methods: {
                getData: function () {
                    var e = this;
                    e.$axios.get(e.urlRole).then(function (t) {
                        for (var a = 0; a < t.data.meta.rows.length; a++) e.tableData.push(t.data.meta.rows[a]);
                    })
                }, getRadioValue: function (e) {
                    this.formInline.radio = e
                }, reservation: function () {
                    var e = this, t = this.formInline;
                    if (t.userLoginName && t.userName && t.userPassword && t.userRegion) {
                        var a = new URLSearchParams;
                        a.append("name", e.formInline.userLoginName), a.append("id", e.tableData.name), a.append("realName", e.formInline.userName), a.append("rid", e.tableData.id), a.append("type", e.formInline.radio), a.append("password", e.formInline.userPassword), e.$axios.post(e.urlInser, a).then(function (t) {
                            alert("保存成功"), e.$router.push({path: "user"})
                        })
                    } else this.dialogVisible = !0
                }, onRoutes: function (e) {
                    this.$router.push("/" + e)
                }, handleClose: function (e) {
                    this.$confirm("确认关闭？").then(function (t) {
                        e()
                    }).catch(function (e) {
                    })
                }
            }
        }
    }, 1118: function (e, t, a) {
        t = e.exports = a(164)(!1), t.push([e.i, ".handle-title{margin-bottom:20px;border-bottom:1px solid #ccc;height:40px;color:#444;font-weight:700;font-size:16px}.container{margin-left:150px}.el-form-item__label{width:80px;text-align:right}.bottom{text-align:center;margin-left:-140px;margin-top:30px}.el-dialog--small{width:30%}", ""])
    }, 1404: function (e, t) {
        e.exports = {
            render: function () {
                var e = this, t = e.$createElement, a = e._self._c || t;
                return a("div", {staticClass: "table"}, [a("div", {staticClass: "crumbs"}, [a("el-breadcrumb", {attrs: {separator: "/"}}, [a("el-breadcrumb-item", [a("i", {staticClass: "el-icon-menu"}), e._v(" 系统管理")]), e._v(" "), a("el-breadcrumb-item", [e._v("用户管理")])], 1)], 1), e._v(" "), a("div", {staticClass: "handle-box handle-title"}, [e._v("添加用户")]), e._v(" "), a("el-form", {
                    staticClass: "demo-form-inline container",
                    attrs: {inline: !0, model: e.formInline}
                }, [a("el-form-item", {
                    staticClass: "user-input",
                    attrs: {label: "登录名"}
                }, [a("el-input", {
                    attrs: {placeholder: "请输入登录名"},
                    model: {
                        value: e.formInline.userLoginName, callback: function (t) {
                            e.$set(e.formInline, "userLoginName", t)
                        }, expression: "formInline.userLoginName"
                    }
                })], 1), e._v(" "), a("el-form-item", {
                    staticClass: "user-input",
                    attrs: {label: "姓名"}
                }, [a("el-input", {
                    attrs: {placeholder: "请输入姓名"}, model: {
                        value: e.formInline.userName, callback: function (t) {
                            e.$set(e.formInline, "userName", t)
                        }, expression: "formInline.userName"
                    }
                })], 1)], 1), e._v(" "), a("el-form", {
                    staticClass: "demo-form-inline container",
                    attrs: {inline: !0, model: e.formInline}
                }, [a("el-form-item", {
                    staticClass: "user-input",
                    attrs: {label: "密码"}
                }, [a("el-input", {
                    attrs: {placeholder: "请输入密码", type: "password"},
                    model: {
                        value: e.formInline.userPassword, callback: function (t) {
                            e.$set(e.formInline, "userPassword", t)
                        }, expression: "formInline.userPassword"
                    }
                })], 1), e._v(" "), a("el-form-item", {
                    staticClass: "user-input",
                    attrs: {label: "用户角色"}
                }, [a("el-select", {
                    attrs: {data: e.tableData, placeholder: "超级管理员"},
                    model: {
                        value: e.item.name, callback: function (t) {
                            e.$set(e.item, "name", t)
                        }, expression: "item.name"
                    }
                }, e._l(e.tableData, function (e) {
                    return a("el-option", {attrs: {label: e.name, id: e.id, value: e.name}})
                }))], 1), e._v(" "), a("el-form-item", {attrs: {label: "特殊资源"}}, [a("el-radio-group", {
                    attrs: {size: "medium"},
                    on: {change: e.getRadioValue},
                    model: {
                        value: e.formInline.userResource, callback: function (t) {
                            e.$set(e.formInline, "userResource", t)
                        }, expression: "formInline.userResource"
                    }
                }, [a("el-radio", {
                    attrs: {
                        border: "",
                        label: "运营人员",
                        checked: "true"
                    }
                }), e._v(" "), a("el-radio", {
                    attrs: {
                        border: "",
                        label: "业务人员"
                    }
                }), e._v(" "), a("el-radio", {
                    attrs: {
                        border: "",
                        label: "管理员"
                    }
                })], 1)], 1)], 1), e._v(" "), a("el-dialog", {
                    attrs: {
                        title: "提示",
                        visible: e.dialogVisible,
                        width: "30%",
                        "before-close": e.handleClose
                    }, on: {
                        "update:visible": function (t) {
                            e.dialogVisible = t
                        }
                    }
                }, [a("span", {
                    staticStyle: {
                        "text-align": "center",
                        width: "100%",
                        display: "inline-block"
                    }
                }, [e._v("信息填写不完整")]), e._v(" "), a("span", {
                    staticClass: "dialog-footer",
                    attrs: {slot: "footer"},
                    slot: "footer"
                }, [a("el-button", {
                    on: {
                        click: function (t) {
                            e.dialogVisible = !1
                        }
                    }
                }, [e._v("取 消")]), e._v(" "), a("el-button", {
                    attrs: {type: "primary"}, on: {
                        click: function (t) {
                            e.dialogVisible = !1
                        }
                    }
                }, [e._v("确 定")])], 1)]), e._v(" "), a("div", {staticClass: "handle-box bottom"}, [a("el-button", {
                    staticClass: "handle-del mr10",
                    attrs: {type: "primary"},
                    on: {
                        click: function (t) {
                            e.onRoutes("user")
                        }
                    }
                }, [e._v("返回")]), e._v(" "), a("el-button", {
                    staticClass: "handle-del mr10",
                    attrs: {type: "primary"},
                    on: {click: e.reservation}
                }, [e._v("保存")])], 1)], 1)
            }, staticRenderFns: []
        }
    }, 1420: function (e, t, a) {
        var l = a(1118);
        "string" == typeof l && (l = [[e.i, l, ""]]), l.locals && (e.exports = l.locals);
        a(377)("3e89a585", l, !0)
    }, 994: function (e, t, a) {
        a(1420);
        var l = a(378)(a(1015), a(1404), null, null);
        e.exports = l.exports
    }
});
