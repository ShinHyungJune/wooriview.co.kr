<template>
    <div class="m-input-images type01">
        <div class="m-input" v-if="!onlyShow">
            <input type="file" :id="id" @change="changeFile" accept="image/*" :multiple="multiple">

            <label class="m-btn" :for="id">파일 등록</label>
        </div>

        <div class="m-files-wrap" v-if="defaultFiles.length > 0 || files.length > 0">
            <div class="m-files">
                <div class="m-file-wrap" v-for="(file, index) in defaultFiles" :key="index">
                    <div class="m-file" :style="`background-image:url(${file.url})`">
                        <button v-if="!onlyShow" class="m-btn-remove" @click="remove(file, index)" type="button">
                            <i class="xi-trash-o"></i>
                        </button>
                    </div>
                </div>

                <div class="m-file-wrap" v-for="(file, index) in files" :key="index">
                    <div class="m-file" :style="`background-image:url(${file.url})`">
                        <button v-if="!onlyShow" class="m-btn-remove" @click="remove(file, index)" type="button">
                            <i class="xi-trash-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .m-input-images.type01 {}
    .m-input-images.type01 .m-input input {
        display: none;
    }
    .m-input-images.type01 .m-input .m-btn {
        display: inline-block;
        min-width:120px; padding:0 20px;
        line-height:40px; font-weight:bold; text-align: center;
        background-color:#ffc800;
        border-radius:20px; cursor:pointer;
    }
    .m-input-images.type01 .m-files-wrap {
        margin-top:16px;
    }
    .m-input-images.type01 .m-files {
        display: flex; flex-wrap:wrap;
        margin:-4px;
    }
    .m-input-images.type01 .m-file-wrap {
        padding:4px;
    }
    .m-input-images.type01 .m-file {
        width:150px; height:150px;
        position:relative;
        background-size:cover; background-position: center center;
        border-radius:5px; border:1px solid #e1e1e1;
    }
    .m-input-images.type01 .m-file .m-btn-remove {
        width: 20px; height:20px;
        position: absolute; top:10px; right:10px;
        border-radius:5px;
        background-color:red;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    }
    .m-input-images.type01 .m-file .m-btn-remove i {
        color:#fff;
    }
</style>
<script>
export default {
    props: {
        default: {
            default() {
                return []
            }
        },
        required: {
            default: true
        },
        multiple: {
            default: false
        },
        id: {
            default: "file"
        },
        onlyShow: {
            default: false,
        }
    },

    data(){
        return {
            defaultFiles: this.default,
            files: [],
            remove_ids: [],
        }
    },

    methods: {
        changeFile(event) {
            let files = Array.from(event.target.files).map(file => {
                return {
                    name: file.name,
                    file: file,
                    url: URL.createObjectURL(file),
                };
            });

            this.files = [...this.files, ...files];

            this.$emit("change", this.files);
        },

        remove(file, index){
            // 새로 업로드된 파일 목록 중 삭제
            if(file.id) {
                this.defaultFiles.splice(index, 1);

                this.remove_ids.push(file.id);

                return this.$emit("removed", this.remove_ids);
            }

            // 기존 업로드된 파일 목록 중 삭제
            this.files.splice(index, 1);

            this.$emit("change");
        }
    },

    mounted() {
        console.log("야!!!");
        console.log(this.default);
        console.log(this.defaultFiles);
    }
}
</script>
