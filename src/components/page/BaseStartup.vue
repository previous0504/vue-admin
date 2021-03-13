<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 创业项目管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="createTerm">创建团队</el-button>
            </div>
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
                <el-table-column label="企业名称">
                    <template slot-scope="scope">{{ scope.row.enterpriseName }}</template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleAdd(scope.row.id)">加入</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleLevel(scope.row.id)">离开</el-button>
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
        <el-dialog title="创建团队" :visible.sync="isVisible">
            <el-form :model="form">
                <el-form-item label="团队名称" :label-width="120">
                    <el-input v-model="form.teamName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="团队介绍" :label-width="120">
                    <el-input v-model="form.teamIntroduce" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </div>
        </el-dialog>
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
        this.fetchData();
        this.fetchUserInfo();
    },
    methods: {
        // 获取学生列表数据
        async fetchData() {
            let res = await HttpUtil.get(`project/item/itemPage?pageSize=${this.query.pageSize}&pageNumber=${this.query.pageNumber}`);
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
        },
        createTerm() {
            this.isVisible = true;
        },
        handleAdd(id) {
            this.$confirm('是否加入团队?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let res = await HttpUtil.post('user/team/joinTeam', {
                        teamId: id,
                        sno: this.sno
                    });
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '加入团队成功!'
                        });
                    }
                })
                .catch(() => {});
        },
        handleLevel(id) {
            this.$confirm('是否离开团队?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let res = await HttpUtil.post('user/team/leaveTeam', {
                        // teamId:id,
                        sno: this.sno
                    });
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '离开团队成功!'
                        });
                    }
                })
                .catch(() => {});
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
        async handleConfirm() {
            let res = await HttpUtil.post('user/team/createTeam', {
                teamName: this.form.teamName,
                teamIntroduce: this.form.teamIntroduce
            });
            if (res) {
                this.$message.success('创建团队成功！');
                this.isVisible = false;
            }
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
