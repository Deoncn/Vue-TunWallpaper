<script>
import request from '@/utils/request'
import { v4 as uuidv4 } from 'uuid';

export default {
    data: () => ({
        dataObj: {
            policy: "",
            signature: "",
            key: "",
            ossaccessKeyId: "",
            dir: "",
            host: "",
            // callback:'',
        },
        singleSelect: true,
        dialog: false,
        dialogDelete: false,
        fileInfo: null,
        headers: [
            {
                text: '图像ID',
                align: 'start',
                value: 'id',
            },
            { text: '分辨率', value: 'res', sortable: false },
            { text: '类型', value: 'type', sortable: false },
            { text: '图像描述', value: 'description', sortable: false },
            { text: '路径', value: 'src', sortable: false },
            { text: '时间', value: 'time', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        deletelist: [],
        editedIndex: -1,
        editedItem: {
            res: '',
            type: "",
            description: "",
            src: "",
            time: null,
        },
        defaultItem: {
            res: '',
            type: "",
            description: "",
            src: "",
            time: null,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        lomtitle() {
            if (this.formTitle == 'New Item') {
                return true
            } else {
                return false
            }
        },

        //上传数据

        filexten() {
            return this.fileInfo.name.substring(this.fileInfo.name.lastIndexOf('.'))
        },

        fileuuid() {
            return uuidv4().replaceAll("-", "");
        }


    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        // GET
        initialize() {
            request({
                methods: 'get',
                url: 'img/SourceController/getAllSource/1/1000',
            }).then(res => {
                this.desserts = res.data.data.records
            }).catch(error => {
                console.log(error)
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            console.log("编辑了")
            console.log(this.editedIndex)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            // console.log(this.desserts[this.desserts.indexOf(item)].id)
            // this.editedIndex = this.desserts.indexOf(item)
            this.editedIndex = this.desserts.indexOf(item)

            this.deletelist = [this.desserts[this.desserts.indexOf(item)].id]

            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        // DELETE
        deleteItemConfirm() {
            request({
                method: 'DELETE',
                url: 'img/SourceController/deleteSource',
                data: this.deletelist
            }).then(res => {
                console.log(res)

                // this.desserts.splice(this.editedIndex, 1)
                this.initialize()
                this.closeDelete()
            }).catch(res => {
                console.log(res)
            })
        },

        // ADD
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        // DELETE
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        testbtn() {
            console.log(this.fileuuid)
        },

        beforeUpload() {
            request({
                method: 'GET',
                url: '/oss/policy',
            }).then(res => {
                this.dataObj.policy = res.data.data.policy
                this.dataObj.signature = res.data.data.signature;
                this.dataObj.ossaccessKeyId = res.data.data.accessId;
                this.dataObj.key = res.data.data.dir + uuidv4().replaceAll("-", "") + this.filexten
                console.log(this.dataObj.key)
                this.dataObj.dir = res.data.data.dir;
                this.dataObj.host = res.data.data.host;
                console.log(this.dataObj)

                this.newuploadFile()
            }).catch(error => {
                console.log(error)
            })
        },

        newuploadFile() {
            let formData = new FormData()
            formData.append("key", this.dataObj.key);
            formData.append("policy", this.dataObj.policy);
            formData.append("OSSAccessKeyId", this.dataObj.ossaccessKeyId);
            formData.append("success_action_status", '200');
            formData.append("signature", this.dataObj.signature);
            formData.append("file", this.fileInfo);


            request({
                method: 'POST',
                url: 'https://deoncnone.oss-cn-chengdu.aliyuncs.com',
                data: formData,
            }).then(res => {
                console.log(res)
                alert("上传成功")
                this.editedItem.src = "https://deoncnone.oss-cn-chengdu.aliyuncs.com/" + this.dataObj.key
            }).catch(error => {
                console.log(error)
            })
        },

        uploadFile() {
            let formData = new FormData()
            console.log(this.fileInfo, '文件信息');
            formData.append('multipartFile', this.fileInfo);

            request({
                method: 'POST',
                url: 'sms/system/headerImgUpload',
                data: formData,
            }).then(res => {
                console.log(res.data.data)
                console.log("上传成功了")
                this.editedItem.src = "http://localhost:9001/" + res.data.data
            }).catch(error => {
                console.log(error)

            })

        },

        // ADD
        save() {
            if (this.editedIndex > -1) {
                console.log("是编辑项目")
                request({
                    method: 'POST',
                    url: 'img/SourceController/saveOrUpdateSource',
                    data: this.editedItem
                }).then(res => {
                    console.log(res)
                    this.initialize()

                }).catch(error => {
                    console.log(error)
                })
                // Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                request({
                    method: 'POST',
                    url: 'img/SourceController/saveOrUpdateSource',
                    data: this.editedItem
                }).then(res => {
                    console.log(res)
                    this.initialize()
                }).catch(error => {
                    console.log(error)
                })
                // this.desserts.push(this.editedItem) 
                console.log("新增成功")
            }


            this.close()
        },
    },
}
</script>

<template>
    <v-data-table :headers="headers" show-select :items="desserts" sort-by="calories" class="elevation-1" :single-select="singleSelect">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>数据库管理</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">

                    <template v-slot:activator="{ on, attrs }">
                        <v-row justify="end">
                            <v-col cols="12" sm="6" md="2">

                                <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                                    添加对象
                                </v-btn>
                            </v-col>

                            <v-col cols="12" sm="6" md="2">
                                <v-switch v-model="singleSelect" label="单选化" class="pa-3"></v-switch>
                            </v-col>
                            

                        </v-row>




                    </template>


                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.res" label="分辨率"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.type" label="类型"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.description" label="图像描述"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.src" label="路径">
                                        </v-text-field>
                                        <div v-if="lomtitle">

                                            <v-file-input v-model="fileInfo" show-size counter outlined label="FileUpload">
                                            </v-file-input>

                                            <v-btn color="primary" @click="beforeUpload">上传</v-btn>

                                            <!-- <v-btn color="primary" @click="newuploadFile">update</v-btn> -->
                                            <!-- <v-btn @click="testbtn">test</v-btn> -->

                                        </div>
                                        <v-img :src="editedItem.src" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.time" label="时间"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                取消
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                保存
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">确定要删除吗？</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>

