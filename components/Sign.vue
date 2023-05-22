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
        this.canvas.addEventListener('touchstart', this.startDrawing);
        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('touchmove', this.draw);
        this.canvas.addEventListener('mouseup', this.stopDrawing);
        this.canvas.addEventListener('touchend', this.stopDrawing);
        this.canvas.addEventListener('mouseout', this.stopDrawing);
        this.canvas.addEventListener('touchcancel', this.stopDrawing);
    },
    methods: {
        startDrawing(event) {
            event.preventDefault();

            this.isDrawing = true;

            if (event.type === 'touchstart') {
                this.lastX = event.touches[0].clientX - this.canvas.offsetLeft;
                this.lastY = event.touches[0].clientY - this.canvas.offsetTop;
            } else {
                this.lastX = event.offsetX;
                this.lastY = event.offsetY;
            }
        },
        draw(event) {
            if (!this.isDrawing) return;
            event.preventDefault(); // 기본 동작 방지

            let newX, newY;

            if (event.type === 'touchmove') {
                newX = event.touches[0].clientX - this.canvas.offsetLeft;
                newY = event.touches[0].clientY - this.canvas.offsetTop;
            } else {
                newX = event.offsetX;
                newY = event.offsetY;
            }

            this.context.beginPath();
            this.context.moveTo(this.lastX, this.lastY);
            this.context.lineTo(newX, newY);
            this.context.stroke();

            this.lastX = newX;
            this.lastY = newY;
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

@media screen and (max-width:768px){
    .signature-container {
        display: flex; align-items: center; justify-content: center;
    }
    .signature-canvas {
        position: static; transform:none;
    }
}
</style>
