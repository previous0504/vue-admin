<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 基础设置 </el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item align="center" label="旧的密码">
                        <el-input style="width:300px" v-model="form.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item align="center" label="新的密码">
                        <el-input style="width:300px" v-model="form.password"></el-input>
                    </el-form-item>
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
            form: {
                id: JSON.parse(localStorage.getItem('ms_username')).id,
                oldPassword: '',
                password: '',
                role: JSON.parse(localStorage.getItem('ms_username')).role,
                username: JSON.parse(localStorage.getItem('ms_username')).username
            }
        };
    },
    methods: {
        //获取个人资料
        // async fetchUserInfo() {
        //     let res = await HttpUtil.get(`user/userinfo?userId=${this.userId}&rId=${this.roleId}`);
        // },
        async onSubmit() {
            let form = this.form;
            let res = await HttpUtil.post('user/password', form);
            if (res.code != 200) {
                this.$message.error(res.message);
            } else {
                this.$message.success('修改密码成功！');
                this.$router.push('/');
            }
        }
    },
    mounted() {
        this.fetchUserInfo();
    }
};
</script>
<style lang="css" scoped>
.form-box {
    width: 500px;
    margin: 0 auto;
    min-height: 400px;
}
</style>
