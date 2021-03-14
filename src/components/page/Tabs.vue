<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 审批管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="handle-box">
                <el-button type="primary" @click="applyItem">申请创业项目</el-button>
            </div> -->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
                <el-table-column prop="itemName" label="项目名称"></el-table-column>
                <el-table-column label="项目编号">
                    <template slot-scope="scope">{{ scope.row.itemNum }}</template>
                </el-table-column>
                <el-table-column label="项目负责人">
                    <template slot-scope="scope">{{ scope.row.leaderName }}</template>
                </el-table-column>
                <el-table-column label="指导老师">
                    <template slot-scope="scope">{{ scope.row.tutorName }}</template>
                </el-table-column>
                <el-table-column label="企业联系人">
                    <template slot-scope="scope">{{ scope.row.enterpriseName }}</template>
                </el-table-column>
                <el-table-column label="审批状态">
                    <template slot-scope="scope">{{
                        scope.row.itemStatus == 1 ? '待审批' : scope.row.itemStatus == 2 ? '教师审批通过' : '企业审批通过'
                    }}</template>
                </el-table-column>

                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleCheck(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>
    </div>
</template>

<script>
import { HttpUtil } from '../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            roleId: JSON.parse(localStorage.getItem('ms_username')).role,
            userId: JSON.parse(localStorage.getItem('ms_username')).id,
            sno: '',
            query: {
                address: '',
                name: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            isVisible: false,
            pageTotal: 0,
            form: {
                teamIntroduce: '',
                teamName: ''
            }
        };
    },
    mounted() {
        this.fetchUserInfo();
    },
    methods: {
        // 获取学生列表数据
        async fetchData() {
            let res = await HttpUtil.get(
                `project/item/reviewedItems?pageSize=${this.query.pageSize}&pageNumber=${this.query.pageNumber}&roleId=${this.roleId}&sno=${this.sno}`
            );

            this.tableData = res.data.records;
            console.log(res.data);
            this.query.pageNumber = res.data.current;
            this.query.pageSize = res.data.size;
            this.pageTotal = res.data.total;
        },
        //获取个人资料
        async fetchUserInfo() {
            let res = await HttpUtil.get(`user/userinfo?userId=${this.userId}&rId=${this.roleId}`);
            this.sno = res.data.sno;
            this.fetchData();
        },
        applyItem() {
            this.$router.push('/');
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNumber', val);
            this.fetchData();
        },
        handleCheck(row) {
            this.$router.push({
                path: '/auditdetails',
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
</style>
