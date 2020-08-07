<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}英雄</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <el-form-item label="名称">
                        <el-input v-model.trim="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model.trim="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select multiple v-model="model.categories">
                            <el-option
                                v-for="item in categories"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="难度">
                        <el-rate :max="9" style="margin-top: 11px" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="9" style="margin-top: 11px" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate :max="9" style="margin-top: 11px" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="9" style="margin-top: 11px" v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">
                        <el-select multiple v-model="model.items1">
                            <el-option
                                v-for="item in items"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="逆风出装">
                        <el-select multiple v-model="model.items2">
                            <el-option
                                v-for="item in items"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
                        <el-upload
                            class="avatar-uploader"
                            :action= "$http.defaults.baseURL + 'upload'"
                            :show-file-list="false"
                            :on-success="afterUplaod">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
                        </el-upload>
                    </el-form-item>
                    
                </el-tab-pane>
                <el-tab-pane label="技能" name="jineng">
                    <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action= "$http.defaults.baseURL + 'upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'icon', res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="简介">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="model.skills.splice(index, 1)" type="danger">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 50px;">
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
            categories: [],
            items: [],
            model: {
                name: '',
                avatar: '',
                scores: {
                    difficult: 0,
                    skills: 0,
                    attack: 0,
                    survive: 0
                }
            },
            parents: []
        }
    },
    mounted(){
        this.id && this.detail();
        this.fetchCategories();
        this.fetchItems();
    },
    methods: {
        afterUplaod(res){
            this.model.avatar = res.url;
        },
        async save(){
            if(this.model.name == ''){
                this.$message({
                    type: 'error',
                    message: '英雄名称不能为空'
                });
                return;
            };
            let res;
            if(!this.id){
                res = this.$http.post('rest/heros', this.model);
            }else{
                res = this.$http.put(`rest/heros/${this.id}`, this.model);
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            });
            this.$router.push('/heros/list')
        },
        async detail(){
            const res = await this.$http.get(`rest/heros/${this.id}`);
            this.model = Object.assign({}, this.model, res.data);
        },
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        async fetchItems(){
            const res = await this.$http.get(`rest/items`);
            this.items = res.data;
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