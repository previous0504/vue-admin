<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 学校通知详情 </el-breadcrumb-item>
               
            </el-breadcrumb>
        </div>
        <div class="container">
            <h3 style="text-align:center;">{{ inform.head }}</h3>
            <div style="text-align:center;margin:10px 0px 20px 20px;">
                <span>作者:{{ inform.publisher }}</span>
                <span >发布时间:{{ inform.pubdate }}</span>
            </div>

            <div v-html="inform.content"></div>
        </div>
    </div>
</template>

<script>
import { HttpUtil } from '../../utils/request';
export default {
    name: 'baseform',
    data() {
        return {
            
            id: '',
            inform: {}
        };
    },
    methods: {
        async fetchData() {
            let res = await HttpUtil.get(`project/inform/informinfo?informId=${this.id}`);
            console.log(res);
            this.inform = res.data;
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.fetchData();
    }
};
</script>
<style lang="css" scoped>
.container {
    min-height: 400px;
}
</style>
