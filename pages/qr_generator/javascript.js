const app = Vue.createApp({
    data() {
        return {
            text: "",
            qrSize: {
                width: 128,
                height: 128
            },
            textSize: 12,
            includeText: true
        }
    },
    created(){
    },
    mounted(){
        //new QRCode(document.getElementById("qrcode"), "A100");
    },
    watch: {
        
    },
    methods:{
        btnGenerate_Click(){
            let texts = this.text.split("\n");

            let qrContainer = document.getElementById("qrContainer");
            while(qrContainer.hasChildNodes()){
                qrContainer.removeChild(qrContainer.firstChild);
            }

            texts.forEach(line => {
                let newDiv = document.createElement("div");
                let newId = line.replace(" ", "_").toLowerCase() + Math.round(Math.random() * 80000);
                newDiv.id = newId;
                newDiv.className = "QR";

                if(this.includeText) {
                    let nameQr = document.createElement("p");
                    nameQr.className = "nameQr";
                    nameQr.innerHTML = line;
                    nameQr.style.fontSize = `${this.textSize}px`;
                    newDiv.appendChild(nameQr);
                }

                qrContainer.appendChild(newDiv);

                new QRCode(document.getElementById(newId), {
                    text: line,
                    width: this.qrSize.width,
                    height: this.qrSize.height
                });
            });
        },
        iSize_Changed(evt){
            this.qrSize.width = evt.target.value;
            this.qrSize.height = evt.target.value;
        }
    }
})

app.mount('#app');