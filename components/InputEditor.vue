<template>
    <div class="ql-editor">
        <div id="editor" ref="editor" style="height:400px;"></div>
    </div>
</template>
<script>

export default {
    components: {},

    props: {
        default: "",

        required: {
            default: true
        },
    },

    data() {
        return {
            value: this.default,
            editor: "",
        }
    },

    methods: {
        changeContents() {
            this.$emit("change", this.editor.root.innerHTML);
        },

        async uploadImage(blob) {
            let formData = new FormData();

            formData.append("file", blob);

            return axios.post("/api/imageUpload", formData)
                .then(response => {
                    return response.data;
                });
        },

        async onUploadImage(blob, callback) {
            const url = await this.uploadImage(blob);

            callback(url, '');

            this.changeContents();

            return false;
        }
    },

    mounted() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'color': []}, {'background': []}],
            [{'font': []}],
            [{'align': []}],
            ['clean', 'image']
        ]

        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow',
        })

        this.editor.on("text-change", () => {
            this.changeContents();
        })

        this.editor.pasteHTML(this.default);

        // this.$refs.editor.quill.setContents(this.default);
        // this.$store.commit('setQuillInstance', quill)
    },

    watch: {
        value: function (value, oldValue) {
            this.$emit("change", value);
        }
    }
}
</script>
