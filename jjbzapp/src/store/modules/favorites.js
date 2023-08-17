export default {
    namespaced: true,
    state: {

        // Database
        indexedDB: null,
        // Cache
        lovelistids: JSON.parse(localStorage.getItem("lovelistids")) || [],

    },

    getters: {

        favst: function (state, item) {
            console.log(item)
        }

    },

    // (context , value)
    actions: {

        FAVORITE_IT(context, item) {

            if (context.state.lovelistids.includes(item.id)) {

                const spn = context.state.lovelistids.indexOf(item.id);

                context.state.lovelistids.splice(spn, 1);
                context.commit("DELETE_OBJECT", item)
            } else {

                context.state.lovelistids.push(item.id);
                context.commit("ADD_OBJECT", item);
            }

        },

        // 获取 数据
        GET_OBJECTS(context, value) {

            context.commit("GET_OBJECTS", context.rootState);

            // if (context.state.indexedDB) {
            //     context.commit("GET_OBJECTS", context.rootState);
            // } else {
            //     context.commit("CONNECT_IDB");
            // }

        },

        TESTTT(context, value) {

            context.commit("TEST")
            console.log("value", value)
        }



    },

    // (state, value)
    mutations: {

        // 初次创建 IDB
        BUILD_IDB_FV(state, value) {

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
                console.error(`Database error: ${event.target.errorCode}`);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                const objectStore = db.createObjectStore("favorites", { keyPath: "id" });

                objectStore.createIndex("id", "id", { unique: true });

                objectStore.transaction.oncomplete = (event) => {
                    console.log("收藏列表初始化完成");
                    const customerObjectStore = db.transaction("favorites", "readwrite").objectStore("favorites");
                    // customerData.forEach((customer) => {
                    //     customerObjectStore.add(customer);
                    // });
                };


            };

        },

        TEST(state, value) {
            // value.commit("GET_OBJECTS", value.rootState)
            console.log("你好啊")
        },

        // 获取项目
        GET_OBJECTS(state, value) {
            // 首先应该清除 画布数据
            // this.lovelovelist = [];

            state.fovlist = [];

            const objectStore = state.indexedDB.transaction("favorites").objectStore("favorites");

            // 分页数据初始化  total , length , dafaultstate.size


            objectStore.count().onsuccess = event => {
                state.total = event.target.result;

                if (state.total / value.settings.Defaultstate.size <= 1) {
                    state.length = 1;
                } else {
                    console.log("222");
                    state.length = parseInt(state.total / value.settings.Defaultstate.size) + 1;
                }

                console.log(state.total)

            };

            let index = null;
            // 数据初始化 队列
            objectStore.openCursor().onsuccess = event => {
                const cursor = event.target.result;

                if (cursor) {
                    if (index === value.settings.Defaultstate.size - 1) {
                        state.fovlist.push(cursor.value);

                        console.log("读取数据成功：", state.fovlist);
                        console.log("总条目", state.total);

                        return null;
                    } else if (index === null && state.page !== 1) {
                        console.log(
                            "读取跳过：",
                            (state.page - 1) * value.settings.Defaultstate.size
                        );
                        index = 0;
                        cursor.advance((state.page - 1) * value.settings.Defaultstate.size);
                    } else {
                        index++;
                        state.fovlist.push(cursor.value);
                        cursor.continue();
                    }
                } else {
                    console.log("读取数据成功：", state.fovlist);
                    console.log("总条目", state.total);
                }
            };



        },


        // 连接IDB
        CONNECT_IDB(state, value) {

            indexedDB.open("ttbz_wallpaper").onsuccess = event => {
                state.indexedDB = event.target.result;
                console.log("数据库连接成功！", state.indexedDB);
            };
            indexedDB.open("ttbz_wallpaper").onerror = event => { console.log("发生错误！", event); };


        },


        // 添加项目
        ADD_OBJECT(state, item) {

            const transaction = state.indexedDB.transaction(["favorites"], "readwrite");

            transaction.oncomplete = (event) => { console.log("ADD DONE!", event); };
            transaction.onerror = (event) => { console.log("error!", event); };

            [item].forEach((customer) => {

                transaction.objectStore("favorites").add(customer).onsuccess = (event) => {
                    //console.log(event);
                };

            });


        },


        // 删除项目
        DELETE_OBJECT(state, item) {

            const request = state.indexedDB.transaction(["favorites"], "readwrite").objectStore("favorites").delete(Number(item.id));

            request.onsuccess = (event) => { console.log("GONE!", event) };
            request.onerror = (event) => { console.error(`Database error: ${event.target.errorCode}`); };



        },



    }




}