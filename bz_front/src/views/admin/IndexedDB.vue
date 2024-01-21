<template>
    <v-container>


        <v-row>
            <v-col cols="12" sm="6" align="center">
                <h1> 收藏 ❤ 本地持久化 </h1>
            </v-col>
        </v-row>

        <v-row>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="getObject()">查 所有数据</v-btn>
            </v-col>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="addObject()">添加</v-btn>
            </v-col>

            <v-col cols="12" sm="1"> <v-text-field dense outlined v-model="deleteId"> </v-text-field></v-col>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="deletObject(deleteId)">删除</v-btn>
            </v-col>
        </v-row>


        <v-row>
            <v-col cols="12" sm="6" align="center">
                <h1> 设置 本地持久化 </h1>
            </v-col>
        </v-row>

        <v-row>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="getdefaultObject()">查 所有数据</v-btn>
            </v-col>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="heloo()">添加</v-btn>
            </v-col>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="heloo()">删除</v-btn>
            </v-col>


            <v-col cols="12" sm="2">
                <v-btn outlined @click="defaultstate()"> 创建 数据仓库 </v-btn>
            </v-col>
        </v-row>


        <v-row>
            <v-col cols="12" sm="6" align="center">
                <h1> 数据库初始化相关 </h1>
            </v-col>
        </v-row>
        <v-row>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="openindexedDB()"> 数据库 初始化 </v-btn>
            </v-col>

            <v-col cols="12" sm="2">
                <v-btn outlined @click="openObjectstore()"> 创建 数据仓库 </v-btn>
            </v-col>

            <v-btn outlined @click="testapi()"> 判断存在于否 </v-btn>

        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'


export default {
    data: () => ({
        deleteId: 0,
    }),
    // 链接vuex
    computed: mapState({ Defaultstate: 'Defaultstate' }),

    methods: {

        ...mapMutations("favorites", {

            GreateIt: "BUILD_IDB_FV",


        }),


        // 创建数据存储空间
        openindexedDB() {

            const dbName = "ttbz_test";
            var request = indexedDB.open(dbName, 30);

            request.onerror = (event) => {
                // 错误处理
                console.log("错误控制台输出", event)
                console.error(`Database error: ${event.target.errorCode}`);
            };

            request.onupgradeneeded = (event) => {
                var db = event.target.result;
                this.db = db;


            };

            console.log(this.db);

        },

        testapi() {
            const dbName = "ttbz_wallpaper";
            const request = indexedDB.open(dbName);

            request.onerror = (event) => {
                // 错误处理
                console.log("错误控制台输出", event)
                console.error(`Database error: ${event.target.errorCode}`);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                this.db = db;
                const objectStore = db.createObjectStore("favorites", { keyPath: "id" });
                console.log("HELLO", objectStore);
            }

            request.onsuccess = (event) => {
                const db = event.target.result;
                console.log(db)
                
                const objectStore = db.transaction("favorites").objectStore("favorites");

            }

        },

        // 建 (❤ ω ❤) 库
        openObjectstore() {

            const customerData = [
                {
                    "id": 135,
                    "res": "3840 x 2160",
                    "type": "风景",
                    "description": "壁纸; 风景",
                    "src": "https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",
                    "time": null,
                    "isfmo": false
                },
                {
                    "id": 139,
                    "res": "3840 x 2160",
                    "type": "风景",
                    "description": "壁纸; 风景",
                    "src": "https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",
                    "time": null,
                    "isfmo": false
                },
            ];

            const dbName = "ttbz_wallpaper";
            const request = indexedDB.open(dbName);

            request.onerror = (event) => {
                // 错误处理
                console.log("错误控制台输出", event)
                console.error(`Database error: ${event.target.errorCode}`);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                this.db = db;

                const objectStore = db.createObjectStore("favorites", { keyPath: "id" });

                objectStore.createIndex("id", "id", { unique: true });

                objectStore.transaction.oncomplete = (event) => {
                    console.log(event);
                    const customerObjectStore = db.transaction("favorites", "readwrite").objectStore("favorites");
                    // customerData.forEach((customer) => {
                    //     customerObjectStore.add(customer);
                    // });
                };


                console.log(this.db);
            };

        },

        // 建 DefaultStat 库
        defaultstate() {

            const customerData = [{
                "fullscreen": false,
                "detail": false,
                "animation": false,
                "hdmode": false,
                "compact": false,
                "size": "24"
            }];

            const dbName = "ttbz_wallpaper";
            const request = indexedDB.open(dbName, 2);

            request.onerror = (e) => {
                console.log(e.target.result);
            }

            request.onsuccess = (event) => {
                const db = event.target.result;
                this.db = db;

                console.log(this.db);
            };

            request.onupgradeneeded = (e) => {
                const db = e.target.result;

                const objectStore = db.createObjectStore("settings");

                objectStore.transaction.oncomplete = (event) => {
                    console.log(event);
                    const customerObjectStore = db.transaction("settings", "readwrite").objectStore("settings");

                    customerObjectStore.add(customerData, 101).onsuccess = (event) => {
                        console.log(event);
                    }

                };

            };



        },


        // 连接仓库
        connectStore() {

            const dbName = "ttbz_wallpaper";
            const request = indexedDB.open(dbName);

            request.onerror = (event) => { console.log("发生错误！", event) };

            request.onsuccess = (event) => {
                const db = event.target.result;
                this.db = db;

                console.log(this.db);
            };

        },


        // 增加数据
        addObject() {
            const customerData = [{
                "id": 135,
                "res": "3840 x 2160",
                "type": "风景",
                "description": "壁纸; 风景",
                "src": "https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",
                "time": null,
                "isfmo": false
            }, {
                "id": 135,
                "res": "3840 x 2160",
                "type": "风景",
                "description": "壁纸; 风景",
                "src": "https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/0fd60bb7aac04e638098c87c4fb627e2.png",
                "time": null,
                "isfmo": false
            }]


            const db = this.db;
            const transaction = db.transaction(["favorites"], "readwrite");
            // Do something when all the data is added to the database.

            transaction.oncomplete = (event) => {
                console.log("All done!", event);
            };

            transaction.onerror = (event) => {
                // Don't forget to handle errors!
                console.log("error!", event);
            };

            const objectStore = transaction.objectStore("favorites");
            customerData.forEach((customer) => {
                const request = objectStore.add(customer);
                request.onsuccess = (event) => {
                    console.log(event);
                    // event.target.result === customer.ssn;
                };
            });


        },

        // 删除数据
        deletObject(deleteId) {
            console.log(deleteId);
            const rpg = Number(deleteId);

            const db = this.db;
            const request = db.transaction(["favorites"], "readwrite").objectStore("favorites").delete(rpg);

            request.onerror = (event) => {
                // 错误处理
                console.log("错误控制台输出", event)
                console.error(`Database error: ${event.target.errorCode}`);
            };

            request.onsuccess = (event) => {
                console.log("It's gone!", event)
            };

        },

        //查询数据
        getObject() {
            const db = this.db;
            const objectStore = db.transaction("favorites").objectStore("favorites");

            objectStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    console.log(`Name for id ${cursor.key} is ${cursor.value.f}`);
                    cursor.continue();
                } else {
                    console.log("No more entries!");
                }
            };

        },

        getdefaultObject() {
            const db = this.db;
            const objectStore = db.transaction("settings").objectStore("settings");

            objectStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    console.log(`Name for id ${cursor.key} is ${cursor.value}`);
                    console.log(cursor.value)
                    cursor.continue();
                } else {
                    console.log("No more entries!");
                }
            };

        },


    },

    created() {
        console.clear();
        // this.connectStore();

    },



}
</script>