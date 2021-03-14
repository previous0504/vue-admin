<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 咨询详情 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- -->
            <!-- {{ topic }}
            {{ content }} -->
            <div class="chat-wrap" v-for="item in listData" :key="item.id">
                <div style="display:flex;flex-direction:column;font-size:12px;align-items:center;">
                    <img style="width:50px;height:50px;border-radius:50%;" src="../../assets/img/img.jpg" class="user-avator" alt />
                    <div>{{ item.username }}</div>
                </div>
                <!-- <div v-for="item in listData" :key="item.id">{{item.topic}}</div> -->
                <div class="chat-content">
                    <div class="chat-title">
                        <div>{{ item.reply }}</div>
                    </div>
                    <div class="position">
                        <div>{{ item.position }}楼</div>
                        <div style="margin-left:10px;">{{ item.createTime }}</div>
                    </div>
                    <!-- <div class="time">{{ item.createTime }}</div>
                    <div class="chat-detail">{{ item.content }}</div> -->
                </div>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageNumber"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <!-- 发表回复-->
            <div>发表回复</div>
            <el-input :rows="5" type="textarea" v-model="reply"></el-input>
            <div class="handle-box" style="text-align:center;margin-top:20px;">
                <el-button type="primary" @click="handleReply">发表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { HttpUtil } from '../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            username: JSON.parse(localStorage.getItem('ms_username')).username,
            userId: JSON.parse(localStorage.getItem('ms_username')).id,
            sno: '',
            query: {
                pageNumber: 1,
                pageSize: 10
            },
            listData: [],
            multipleSelection: [],
            delList: [],
            isVisible: false,
            pageTotal: 0,
            form: {
                topic: '',
                content: '',
                userid: '',
                username: ''
            },
            dialogFormVisible: false,
            topicId: '',
            content: '',
            topic: '',
            reply: ''
        };
    },
    mounted() {
        // this.fetchUserInfo();
        let query = this.$route.query;
        this.topicId = query.id;
        this.content = query.content;
        this.topic = query.topic;
        this.fetchData();
    },
    methods: {
        // 获取chat列表
        async fetchData() {
            let res = await HttpUtil.get(
                `forum/reply/topicReplyPage?pageSize=${this.query.pageSize}&pageNumber=${this.query.pageNumber}&topicId=${this.topicId}`
            );
            this.listData = res.data.records;
            this.query.pageNumber = res.data.current;
            this.query.pageSize = res.data.size;
            this.pageTotal = res.data.total;
        },

        applyItem() {
            this.$router.push('/applystartup');
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async handlePublish() {
            this.form.username = this.username;
            this.form.userid = this.userId;
            let res = await HttpUtil.post('forum/topic/info', this.form);
            if (res) {
                this.$message.success('发帖成功！');
                this.dialogFormVisible = false;
                this.fetchData();
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNumber', val);
            this.fetchData();
        },
        async handleReply() {
            let data = {
                reply: this.reply,
                topicId: this.topicId,
                userid: this.userId,
                username: this.username
            };
            let res = await HttpUtil.post('forum/reply/newReply', data);
            if (res) {
                this.$message.success('回复成功！');
                this.$router.push('/chat');
            }
        },
        handleCheck(row) {
            this.$router.push({
                path: '/startupdetails',
                query: {
                    obj: JSON.stringify(row)
                }
            });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.chat-wrap {
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    height: 140px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 10px;
    /* flex-direction: column; */
}
.chat-content {
    width: 100%;
    display: flex;
    padding: 0px 30px;
    flex-direction: column;
    justify-content: space-between;
}
.chat-title {
    width: 100%;
    font-size: 14px;
    color: #000;
    display: flex;
    justify-content: space-between;
}
.time {
    font-size: 12px;
    color: #53688b;
}
.chat-detail {
    color: #666;
    font-size: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.position {
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
}
</style>
