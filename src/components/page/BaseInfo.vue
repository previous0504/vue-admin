<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 基础设置 </el-breadcrumb-item>
                <el-breadcrumb-item>个人资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :inline="true" ref="form" :model="form" label-width="100px">
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="名称">
                                <el-input style="width:300px;" v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="性别">
                            <el-input style="width:300px;" v-model="form.gender"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="出生日期">
                                <el-input style="width:300px;" v-model="form.birthday"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="手机号">
                            <el-input style="width:300px;" v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="邮箱">
                                <el-input style="width:300px;" v-model="form.email"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="学院">
                            <el-input style="width:300px;" v-model="form.academy"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="专业">
                                <el-input style="width:300px;" v-model="form.major"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="推荐创业项目">
                            <el-input style="width:300px;" v-model="form.projectKey"></el-input>
                        </el-form-item>
                    </el-row>
                    <div style="text-align:center;margin-top:20px;">
                        <el-form-item>
                            <el-button @click="$router.push('/')">返回</el-button>
                            <el-button type="primary" @click="onSubmit">修改</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { HttpUtil } from '../../utils/request';
export default {
    name: 'baseform',
    data() {
        return {
            roleId: JSON.parse(localStorage.getItem('ms_username')).role,
            userId: JSON.parse(localStorage.getItem('ms_username')).id,
            form: {
                name: '',
                gender: '',
                birthday: '',
                phone: '',
                email: '',
                academy: '',
                major: '',
                projectKey: '',
                sno: '',
                userId: ''
            }
        };
    },
    methods: {
        //获取个人资料
        async fetchUserInfo() {
            let res = await HttpUtil.get(`user/userinfo?userId=${this.userId}&rId=${this.roleId}`);
            console.log(res);
            this.form.name = res.data.name;
            this.form.gender = res.data.gender;
            this.form.birthday = res.data.birthday;
            this.form.phone = res.data.phone;
            this.form.email = res.data.email;
            this.form.academy = res.data.academy;
            this.form.major = res.data.major;
            this.form.projectKey = res.data.projectKey;
            this.form.sno = res.data.sno;
            this.form.userId = res.data.userId;
            // this.form = res.data;
            // console.log(this.form);
        },
        async onSubmit() {
            let student = this.form;
            console.log(student);
            await HttpUtil.post('/user/student/studentInfo', { student: student });
            this.$message.success('提交成功！');
        }
    },
    mounted() {
        this.fetchUserInfo();
    }
};
</script>
<style lang="css" scoped>
.form-box {
    width: 100%;
    min-height: 400px;
}
</style>
