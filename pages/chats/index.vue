<template>
    <div>
        <div v-for="message in messages.data" :key="message.id">{{message.body}}</div>

        <form @submit.prevent="storeMessage">
            <input type="text" placeholder="내용을 입력하세요" v-model="form.body">
        </form>
    </div>
</template>
<script>
import Pusher from 'pusher-js';
import Form from "@/utils/Form";

export default {
    middleware: ["auth"],

    data(){
        return {
            form: new Form(this.$axios, {
                page: 1,
                chat_id: "",
                body: "",
            }),

            messages: {
                data: [],
                links: {},
                meta: {}
            },

            chat: null,
        }
    },

    methods: {
        setChannel(chat){
            let self = this;

            Pusher.logToConsole = true;

            let key = process.env.NODE_ENV === "production" ? "19fc69039eb8ec6796e0" : "6f46ba6faad7030dd0a9";

            var pusher = new Pusher(key, {
                cluster: 'ap3'
            });

            var channel = pusher.subscribe('chats.' + chat.id);

            channel.bind('App\\Events\\MessageCreated', function(data) {
                self.messages.data.push(data.message);
            });
        },

        getChat(){
            this.$axios.get("/api/chats", {
                params: {
                    application_id: this.$route.query.application_id
                }
            }).then(response => {
                this.chat = response.data.data;

                this.getMessages(false, this.chat);

                this.setChannel(this.chat);
            });
        },

        getMessages(loadMore = false, chat){
            this.form.chat_id = chat.id;

            this.$axios.get("/api/messages", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.messages = {
                        ...response.data,
                        data: [...this.messages.data, ...response.data.data]
                    };

                this.messages = response.data;
            });
        },

        storeMessage(){
            this.form.post("/api/messages")
                .then(response => {
                    this.form.body = "";
                });
        }
    },

    mounted() {
        this.getChat();
    }
}
</script>
