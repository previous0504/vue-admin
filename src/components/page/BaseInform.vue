<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 学校通知添加 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :inline="true" ref="form" :model="form" label-width="100px">
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="通知标题">
                                <el-input style="width:300px;" v-model="form.head"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-form-item label="发布通知者">
                            <el-input style="width:300px;" v-model="form.publisher"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding:10px 0;">
                        <el-col :span="12">
                            <el-form-item label="发布时间">
                                <el-date-picker
                                    style="width:300px;"
                                    v-model="form.pubdate"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="发布内容">
                        <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                    </el-form-item>
                    <div style="text-align:center;margin-top:20px;">
                        <el-form-item>
                            <el-button @click="$router.push('/')">返回</el-button>
                            <el-button type="primary" @click="onSubmit">确定添加</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { HttpUtil } from '../../utils/request';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'baseform',
    components: {
        quillEditor
    },
    data() {
        return {
            roleId: JSON.parse(localStorage.getItem('ms_username')).role,
            form: {
                head: '',
                publisher: '',
                content: '',
                pubdate: '',
                userId: JSON.parse(localStorage.getItem('ms_username')).id
            },
            editorOption: {
                placeholder: ''
            }
        };
    },
    methods: {
        async onSubmit() {
            let res = await HttpUtil.post('/project/inform/informInfo', this.form);
           if(res){
               this.$message.success('新增成功！')
               this.$router.push('/')
           }
        
        },
        async fetchUserInfo() {
            let res = await HttpUtil.get(`user/userinfo?userId=${this.form.userId}&rId=${this.roleId}`);
            this.form.publisher = res.data.name;
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
