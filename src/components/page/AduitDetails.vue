<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 表单 </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :inline="true" ref="form" :model="form" label-width="120px">
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="项目编号">
                                <el-input style="width:300px;" :disabled="true" v-model="form.itemNum"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="项目名称">
                            <el-input style="width:300px;" :disabled="true" v-model="form.itemName"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="项目负责人">
                                <el-input style="width:300px;" :disabled="true" v-model="form.leaderName"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="项目负责人学号">
                            <el-input style="width:300px;" :disabled="true" v-model="form.leaderNum"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="老师">
                                <el-input style="width:300px;" :disabled="true" v-model="form.tutorName"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="企业联系人">
                            <el-input style="width:300px;" :disabled="true" v-model="form.enterpriseName"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="申报时间">
                                <el-date-picker
                                    style="width:300px;"
                                    :disabled="true"
                                    v-model="form.itemDate"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--审核意见 -->
                    <div>审核意见</div>
                    <div style="margin-top:10px;">
                        <el-input v-model="form.reviewOption" type="textarea" :rows="4" placeholder="请输入审批意见"></el-input>
                    </div>
                    <div style="margin-top:20px;">
                        <div>评分</div>
                        <el-input style="width:400px;" v-model="form.reviewScore"></el-input>
                    </div>

                    <div style="text-align:center;margin-top:20px;">
                        <el-form-item>
                            <el-button @click="$router.push('/startup')">返回</el-button>
                            <el-button type="primary" @click="onSubmit">确认通过</el-button>
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
                role:'',
                reviewScore: '',
                reviewOption: '',
                userNum:''
            }
        };
    },
    mounted() {
        let o = this.$route.query.obj;
        this.form = Object.assign({}, JSON.parse(o));
        this.fetchUserInfo();
    },
    methods: {
        async onSubmit() {
            this.form.roleId = this.roleId;
            this.form.reviewScore = Number(this.form.reviewScore);
            let res = await HttpUtil.post('project/review/addReview', this.form);
            if (res) {
                this.$message.success('确认审批！');
                this.$router.push('/tabs');
            }
        },
        async fetchUserInfo() {
            let res = await HttpUtil.get(`user/userinfo?userId=${this.userId}&rId=${this.roleId}`);
            this.form.userNum = res.data.sno;
        }
    }
};
</script>
<style scoped>
.form-box {
    width: 100%;
    min-height: 400px;
}
</style>
