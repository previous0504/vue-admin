<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 创业项目管理 </el-breadcrumb-item>
                <el-breadcrumb-item>申请创业项目</el-breadcrumb-item>
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
                            <el-input style="width:300px;" v-model="form.itemName"></el-input>
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
                            <el-form-item label="指导老师姓名">
                                <el-input style="width:300px;" :disabled="true" v-model="form.tutorName"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="职工号">
                            <el-input style="width:300px;" v-model="form.tutorNum" @input="getTeacher"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="企业名称">
                                <el-input style="width:300px;" :disabled="true" v-model="form.enterpriseName"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="企业号">
                            <el-input style="width:300px;" v-model="form.enterpriseNum" @input="getEnterprise"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="申报时间">
                                <el-date-picker style="width:300px;" v-model="form.itemDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="项目级别">
                            <!-- <el-input style="width:300px;" v-model="form.itemLevel"></el-input> -->
                            <el-select style="width:300px;" v-model="formInfo.itemLevel" placeholder="请选择">
                                <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="项目类型">
                                <!-- <el-input style="width:300px;" v-model="form.itemType"></el-input> -->
                                <el-select style="width:300px;" v-model="formInfo.itemType" placeholder="请选择">
                                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="项目简介">
                            <el-input type="textarea" style="width:300px;" v-model="formInfo.summary"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:5px 0;">
                        <el-col :span="12">
                            <el-form-item label="校拨经费">
                                <el-input style="width:300px;" v-model="formInfo.collegeFunds"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="公司经费">
                            <el-input style="width:300px;" v-model="formInfo.enterpriseFunds"></el-input>
                        </el-form-item>
                    </el-row>

                    <div style="text-align:center;margin-top:20px;">
                        <el-form-item>
                            <el-button @click="$router.push('/startup')">返回</el-button>
                            <el-button type="primary" @click="onSubmit">申请</el-button>
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
                itemNum: '',
                itemName: '',
                tutorNum: '',
                leaderNum: '',
                leaderName: '',
                tutorName: '',
                enterpriseNum: '',
                enterpriseName: '',
                itemStatus: 1,
                itemDate: ''
            },
            formInfo: {  itemNum: '',itemLevel: '', itemType: '', summary: '', collegeFunds: '', enterpriseFunds: '' },
            levelList: [
                {
                    value: '1',
                    label: '无'
                },
                {
                    value: '2',
                    label: '校级'
                },
                {
                    value: '3',
                    label: '省区级'
                },
                {
                    value: '4',
                    label: '国家级'
                }
            ],
            typeList: [
                {
                    value: '1',
                    label: '创新训练'
                },
                {
                    value: '2',
                    label: '创业训练'
                },
                {
                    value: '3',
                    label: '创业实践'
                }
            ]
        };
    },
    methods: {
        initData() {
            this.getNum();
            this.fetchUserInfo();
        },
        async fetchUserInfo() {
            let res = await HttpUtil.get(`user/userinfo?userId=${this.userId}&rId=${this.roleId}`);
            this.form.leaderNum = res.data.sno;
            this.form.leaderName = res.data.name;
        },
        // 获取编号
        async getNum() {
            let res = await HttpUtil.get('project/item/itemNum');
            this.form.itemNum = res.data;
        },
        // 通过工号获取老师
        async getTeacher() {
            let res = await HttpUtil.get(`user/teacher/singleTeacher?sno=${this.form.tutorNum}`);
            this.form.tutorName = res.data.name;
        },
        // 通过企业号获取企业名
        async getEnterprise() {
            let res = await HttpUtil.get(`user/enterprise/singleInfo?sno=${this.form.enterpriseNum}`);
            this.form.enterpriseName = res.data.name;
        },
        async onSubmit() {
            this.formInfo.itemNum = this.form.itemNum;
            let res1 = await HttpUtil.post('project/item/itemInfo',this.form);
            let res2 = await HttpUtil.post('project/details/itemInfo',this.formInfo)

            this.$message.success('提交成功！');
            this.$router.push('/startup');
        }
    },
    mounted() {
        this.initData();
    }
};
</script>
<style lang="css" scoped>
.form-box {
    width: 100%;
    min-height: 400px;
}
</style>
