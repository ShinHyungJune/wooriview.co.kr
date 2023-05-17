<template>
    <div class="signature-container">
        <canvas ref="canvas" class="signature-canvas"></canvas>
        <button class="signature-canvas-btn" @click="sign">서명완료</button>
    </div>
</template>

<script>
export default {
    mounted() {
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
        this.isDrawing = false;

        this.canvas.addEventListener('mousedown', this.startDrawing);
        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('mouseup', this.stopDrawing);
        this.canvas.addEventListener('mouseout', this.stopDrawing);
    },
    methods: {
        startDrawing(event) {
            this.isDrawing = true;
            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        },
        draw(event) {
            if (!this.isDrawing) return;
            this.context.beginPath();
            this.context.moveTo(this.lastX, this.lastY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        },
        stopDrawing() {
            this.isDrawing = false;
        },
        sign(){
            this.$emit("sign", this.toImgUrl());
        },
        toImgUrl(){
            return this.$refs.canvas.toDataURL('image/png');
        }
    }
};
</script>

<style>
.signature-container {
    width:100%; height:100%;
    position:fixed; top:0; left:0;
    background-color:rgba(0,0,0,0.3);
    z-index:100;
}

.signature-canvas {
    position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
    border: 1px solid black; background-color:#fff;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    z-index:100;
}
.signature-canvas-btn {
    width:300px; height:35px;
    position:fixed; top:calc(50% + 100px); left:50%; transform:translate(-50%, -50%);
    color:#333; background-color:#ffc800; font-weight:bold;
    z-index:100;

}
</style>
