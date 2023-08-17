export default {
    namespaced: true,
    state: {




    },

    // context.commit('JIA',value)
    actions: {

        // 喜欢功能调试
        favouriteitem(context, item) {

            if (this.lovelistids.includes(item.id)) {
                console.log("已喜欢！")

                const spn = this.lovelistids.indexOf(item.id)
                // 根据索引 删除ID
                this.lovelistids.splice(spn, 1);

                // 删除item
                console.log(this.lovelist[spn].id)
                this.lovelist.splice(spn, 1);

                // 删除从那里
                this.deletObject(item);

            } else {
                // this.lovelist.push(this.imgselect.id)
                this.lovelist.push(item);
                this.lovelistids.push(item.id);
                this.addObject(item)

            }

            // this.lovelist.push(this.imgselect.id)
            // this.likeftime();

            console.log(this.lovelist);
        },

        overit(context) {
            context.commit('OVERIT');
            context.commit('OVERHELLO');
        }
    },

    // state, value
    mutations: {
        JIA() {

        },

        OVERIT() {
            console.log("OVERHELLO1");
        },
        OVERHELLO() {
            console.log("OVERHELLO2")
        },


        // 增加到收藏夹 addObjectIDB
        ADDOIDB(item) {

            const customerData = [
                item
            ];

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

        // 移除出收藏夹数据 
        DELOIDB(item) {
            console.log(item.id);
            const rpg = Number(item.id);

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




    },

    getters: {

    }


}