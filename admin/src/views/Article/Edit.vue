<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}文章</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="分类">
                <el-select multiple v-model="model.categories">
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input  v-model.trim="model.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    props: {
        id: {}
    },
    components: {
        VueEditor
    },
    data(){
        return {
            categories: [],
            model: {
            },
        }
    },
    mounted(){
        this.id && this.detail();
        this.fetchCategories();
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            alert(1)
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post('upload',formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
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
                res = this.$http.post('rest/articles', this.model);
            }else{
                res = this.$http.put(`rest/articles/${this.id}`, this.model);
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            });
            this.$router.push('/articles/list')
        },
        async detail(){
            const res = await this.$http.get(`rest/articles/${this.id}`);
            this.model = res.data;
        },
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
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