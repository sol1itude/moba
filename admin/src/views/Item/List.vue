<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <el-table-column prop="icon" label="物品图标">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height: 5rem" alt="">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/items/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleted(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            items: []
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        async init(){
            const res = await this.$http.get('rest/items');
            this.items = res.data;
        },
        async deleted(row){
            this.$confirm(`确定删除分类 "${row.name}"`,{
                title: '提示',
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( async () => {
                const res = await this.$http.delete(`rest/items/${row._id}`);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.init();
            })
            .catch( () => {})
        }
    }
}
</script>

<style>

</style>