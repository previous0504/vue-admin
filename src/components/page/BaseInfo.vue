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
                    <!-- 老师和学生 -->
                    <div v-if="roleId != 3">
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
                    </div>
                    <!-- 企业 -->
                    <div v-if="roleId == 3">
                     <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="企业名称">
                                <el-input style="width:300px;" v-model="enterpriseForm.ename"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="企业介绍">
                            <el-input style="width:300px;" v-model="enterpriseForm.introduction"></el-input>
                        </el-form-item>
                    </el-row>
                     <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="规模">
                                <el-input style="width:300px;" v-model="enterpriseForm.membernumber"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="地点">
                            <el-input style="width:300px;" v-model="enterpriseForm.headquarters"></el-input>
                        </el-form-item>
                    </el-row>
                     <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="企业官网">
                                <el-input style="width:300px;" v-model="enterpriseForm.officialWebsite"></el-input>
                            </el-form-item>
                        </el-col>

                        
                    </el-row>
                    </div>
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
            },
            enterpriseForm: {
                introduction: '',
                headquarters: '',
                officialWebsite: '',
                membernumber: '',
                ename:''
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
            if (this.roleId == 3) {
                this.enterpriseForm.introduction = res.data.introduction;
                this.enterpriseForm.headquarters = res.data.headquarters;
                this.enterpriseForm.officialWebsite = res.data.officialWebsite;
                this.enterpriseForm.membernumber = res.data.membernumber;
                this.enterpriseForm.ename = res.data.ename;
            }
            // this.form = res.data;
            // console.log(this.form);
        },
         async onSubmit() {
            let form = this.form;
           
            console.log(form);
            if (this.roleId == 1) {
                await HttpUtil.post('user/student/studentInfo', form);
            } else if (this.roleId == 2) {
                await HttpUtil.post('user/teacher/studentInfo', form);
            }else if(this.roleId == 3){
                 Object.assign(this.form,this.enterpriseForm)
                await HttpUtil.post('user/enterprise/enterpriseInfo', this.form);
            }
            this.$message.success('提交成功！');
            this.$router.push('/');
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
