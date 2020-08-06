<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent" placeholder="请选择分类">
                    <el-option
                        v-for="item in parents" 
                        :label="item.name" 
                        :value="item._id" 
                        :key="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data(){
        return {
            model: {
                name: ''
            },
            parents: []
        }
    },
    mounted(){
        this.id && this.detail();
        this.parent();
    },
    methods: {
        async save(){
            if(this.model.name == ''){
                this.$message({
                    type: 'error',
                    message: '分类名称不能为空'
                });
                return;
            };
            let res;
            if(!this.id){
                res = this.$http.post('rest/categories', this.model);
            }else{
                res = this.$http.put(`rest/categories/${this.id}`, this.model);
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            });
            this.$router.push('/categories/list')
        },
        async detail(){
            const res = await this.$http.get(`rest/categories/${this.id}`);
            this.model = res.data;
        },
        async parent(){
            const res = await this.$http.get(`rest/categories`);
            this.parents = res.data;
        }
    }
}
</script>

<style>

</style>