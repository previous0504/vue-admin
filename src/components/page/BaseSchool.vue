<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 学校管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="applyItem">申请创业项目</el-button>
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
                <el-table-column prop="name" label="学校名称"></el-table-column>
                <el-table-column label="英文名称">
                    <template slot-scope="scope">{{ scope.row.englishName }}</template>
                </el-table-column>
                <el-table-column label="创办人">
                    <template slot-scope="scope">{{ scope.row.currentLeaders }}</template>
                </el-table-column>
                <el-table-column label="学校性质">
                    <template slot-scope="scope">{{ scope.row.natureOfSchool }}</template>
                </el-table-column>

                <el-table-column label="学校成立时间">
                    <template slot-scope="scope">{{ scope.row.foundedTime }}</template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <!-- <template slot-scope="scope">
                        <el-button type="text" @click="handleCheck(scope.row.id)">查看</el-button>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleCheck(scope.row)">查看</el-button>
                        <el-button type="text" @click="handleChange(scope.row)">修改</el-button>
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
            <!-- -->
            <el-dialog title="学校信息" :visible.sync="isVisible">
                <el-form :model="form">
                    <el-form-item label="学校名称" label-width="120">
                        <el-input style="width:300px;" v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称" label-width="120">
                        <el-input style="width:300px;" v-model="form.englishName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创办人名" label-width="120">
                        <el-input style="width:300px;" v-model="form.currentLeaders" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学校性质" label-width="120">
                        <el-input style="width:300px;" v-model="form.natureOfSchool" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间" label-width="120">
                        <el-date-picker
                            style="width:300px;"
                            v-model="form.foundedTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期时间"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-if="status == 1">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm">确认修改</el-button>
                </div>
                <div slot="footer" class="dialog-footer" v-if="status == 0">
                    <el-button @click="isVisible = false">返 回</el-button>
                </div>
            </el-dialog>
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
            form: {
                name: '',
                englishName: '',
                currentLeaders: '',
                natureOfSchool: '',
                foundedTime: '',
                id: 1
            },
            sno: '',
            query: {
                address: '',
                name: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            isVisible: false,
            multipleSelection: [],
            delList: [],
            isVisible: false,
            pageTotal: 0,
            status: 0
        };
    },
    mounted() {
        this.fetchData();
        this.fetchUserInfo();
    },
    methods: {
        // 获取学生列表数据
        async fetchData() {
            let res = await HttpUtil.get(`user/college/infopage?pageSize=${this.query.pageSize}&pageNumber=${this.query.pageNumber}`);
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
        handleChange(row) {
            this.status = 1;
            this.isVisible = true;
            this.form.name = row.name;
            this.form.englishName = row.englishName;
            this.form.currentLeaders = row.currentLeaders;
            this.form.natureOfSchool = row.natureOfSchool;
            this.form.foundedTime = row.foundedTime;
        },
        handleCheck(row) {
            this.status = 0;
            this.isVisible = true;
            this.form.name = row.name;
            this.form.englishName = row.englishName;
            this.form.currentLeaders = row.currentLeaders;
            this.form.natureOfSchool = row.natureOfSchool;
            this.form.foundedTime = row.foundedTime;
        },
        async handleConfirm() {
            let res = await HttpUtil.post('user/college/info', this.form);
            console.log(res);
            if (res.success) {
                this.$message.success('修改成功！');
                this.isVisible = false;
                this.fetchData;
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
