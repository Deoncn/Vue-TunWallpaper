<template>
    <div>

        <h1>HELLO THRER</h1>

        <v-btn @click="overit">HELLO</v-btn>

        {{ lovelovelist }}

        {{ lovelistids }}

        <div class="img-box" v-for="item in lovelovelist" :key="item.index">

            <div @click="testt()">
                <v-img :src="item.src" :aspect-ratio="279.984 / 186.656"
                    @click="updatesdetail(item), fullscreenpreview()">
                </v-img>
            </div>

            <span class="res-span">{{ item.res }}</span>

            <span class="down-span">
                <a :href="item.src" target="downloadFile">保存</a>
            </span>

            <!-- @click="favouriteitem(item)" -->
            <span class="like-span">

                <!-- v-if="favouriteicon(item) == false" -->
                <button type="button">
                    <v-icon v-if="item.isfmo" color="red">favorite_border</v-icon>
                </button>
                <!-- v-if="favouriteicon(item) == true" -->
                <button v-if="!item.isfmo" type="button" @click="favouriteitem(item, lovelistids, lovelovelist)">
                    <v-icon color="red">favorite</v-icon>
                </button>
            </span>



        </div>


    </div>
</template>



<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import request from '@/utils/request'


export default {
    name: "ItemsView",

    props: ['lovelovelist', 'lovelistids'],

    data: () => ({

    }),

    computed: {

        ...mapState('settings', { Defaultstate: 'Defaultstate' }),

    },
    methods: {

        ...mapActions('viewer', { overit: 'overit' }),
        ...mapMutations('viewer', { hello: 'OVERIT' }),



    },






    created() {

    },
}
</script>