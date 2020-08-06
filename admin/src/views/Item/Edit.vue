<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action= "$http.defaults.baseURL + 'upload'"
                    :show-file-list="false"
                    :on-success="afterUplaod">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                name: '',
                icon: ''
            },
            parents: []
        }
    },
    mounted(){
        this.id && this.detail();
    },
    methods: {
        afterUplaod(res){
            this.model.icon = res.url;
        },
        async save(){
            if(this.model.name == ''){
                this.$message({
                    type: 'error',
                    message: '物品名称不能为空'
                });
                return;
            };
            let res;
            if(!this.id){
                res = this.$http.post('rest/items', this.model);
            }else{
                res = this.$http.put(`rest/items/${this.id}`, this.model);
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            });
            this.$router.push('/items/list')
        },
        async detail(){
            const res = await this.$http.get(`rest/items/${this.id}`);
            this.model = res.data;
        }
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>