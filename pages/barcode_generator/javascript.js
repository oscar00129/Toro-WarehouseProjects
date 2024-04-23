const app = Vue.createApp({
    data() {
        return {
            barcodeText: "",
            lines: []
        }
    },
    created(){
    },
    mounted(){
        
    },
    watch: {
        barcodeText(){
            let lines = this.barcodeText.split("\n");
            this.lines = lines;
        }
    },
    methods:{
    }
})

app.mount('#app');