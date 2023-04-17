<template>
    <ul class="pagination col-group">
        <li class="nav-btn prev" @click="prev"><a href="" @click.prevent=""><i class="xi-long-arrow-left"></i></a></li>
        <li :class="pageClass(page)" v-for="page in pages" :key="page" @click="paginate(page)"><a href="#" :class="pageClass(page)" @click.prevent="">{{page}}</a></li>
        <li class="nav-btn next" @click="next"><a href="" @click.prevent=""><i class="xi-long-arrow-right"></i></a></li>
    </ul>
</template>
<style>
/* pagination */
.pagination {display:flex; align-items: center; justify-content: center; margin-top: 40px; margin-bottom:40px; justify-content: center; gap: 24px;}
.pagination li a{ font-size: 18px; opacity: 0.4; transition: .2s; }
.pagination li a.active, .pagination li:hover a {opacity: 1;}
.pagination li.nav-btn a {
    background-color: #f5f5f5;
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    opacity: 1; position: relative;
}

@media screen and (max-width:768px) {
    .pagination {margin-top: 40px; gap: 16px; }
    .pagination li a { font-size: 14px; }
    .pagination li.nav-btn a::after { width: 12px; height: 12px; }
}
</style>
<script>
export default {
    props:["meta"],

    data(){
        return {
            pageSections: []
        }
    },

    computed: {
        pages(){
            return this.pageSections.find(pageSection => {
                if(pageSection.includes(this.meta.current_page))
                    return true;
            })
        },
    },

    mounted() {
        this.setPages();
    },

    methods: {
        pageClass(page){
            return this.meta.current_page == page
                ? "active"
                : "";
        },

        paginate(page){
            this.$emit("paginate", page);
        },

        first(){
            this.paginate(1);
        },

        prev(){
            if(this.meta.current_page > 1)
                this.paginate(parseInt(this.meta.current_page) - 1);
        },

        next(){
            if(this.meta.current_page < this.meta.last_page)
                this.paginate(parseInt(this.meta.current_page) + 1);
        },

        last(){
            this.paginate(this.meta.last_page);
        },

        setPages(){
            let unit = 10;

            let items = [];

            this.pageSections = [];

            for(let i=1; i<= this.meta.last_page; i++){
                items.push(i);

                if(items.length >= unit || i == this.meta.last_page) {
                    this.pageSections.push(items);
                    items = [];
                }
            }
        }
    },

    watch: {
        'meta': {
            deep:true,
            handler() {
                this.setPages();
            }
        },

    }
}
</script>
