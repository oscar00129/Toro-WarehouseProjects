const app = Vue.createApp({
    data() {
        return {
            scannerMode: true,
            referenceNumber: 1,
            serviceInfo: {
                worker: '',
                partNumber: '',
                qty: '',
                type: {
                    selected: 'SUB ASSY',
                    options: [
                        'SUB ASSY',
                        'PINTURA',
                        'PICKUP'
                    ]
                }
            },
            palletQty: 1,
            pallets: [
                {
                    partNumbers: [
                        { partNumber: '', qty: 0 }
                    ]
                }
            ]
        }
    },
    created(){
        // console.log(this.$refs);
    },
    mounted(){
        // console.log(this.$refs);
    },
    computed: {
    },
    watch: {
        palletQty(){
            if( this.palletQty > 20 ){
                this.palletQty = 20;
            }

            if( this.palletQty < 0 ){
                this.palletQty = 0
            }

            if( this.palletQty > this.pallets.length ){
                while ( this.pallets.length < this.palletQty ) {
                    this.pallets.push(
                        {
                            partNumbers: [
                                { partNumber: '', qty: 0 }
                            ]
                        }
                    );
                }
            }else if(this.palletQty < this.pallets.length){
                while (this.pallets.length > this.palletQty) {
                    this.pallets.pop();
                }
            }
        }
    },
    methods:{
        getDate(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        addPartNumber(palletIndex){
            if(this.pallets[palletIndex].partNumbers && this.pallets[palletIndex].partNumbers.length <= 26){
                this.pallets[palletIndex].partNumbers.push(
                    { partNumber: '', qty: 0 }
                );
            }
        },
        removePartNumber(index, matIndex){
            this.pallets[index].partNumbers.splice(matIndex, 1);
        },
        inputChanged(event, inputType){
            if(this.scannerMode){
                if(inputType == 'partNumber'){
                    event.target.nextSibling.nextSibling.nextSibling.focus();
                }else if(inputType == 'qty'){
                    
                    if(event.target.parentElement.nextSibling.children){
                        event.target.parentElement.nextSibling.children[1].focus();
                    }else if(event.target.parentElement.parentElement.nextSibling.children && event.target.parentElement.parentElement.nextSibling.children[1].children && event.target.parentElement.parentElement.nextSibling.children[1].children[1]){
                        event.target.parentElement.parentElement.nextSibling.children[1].children[1].focus();
                    }else{
                        
                    }
                    
                    
                }
            }
            //console.dir(event.target.nextSibling.nextSibling.nextSibling.focus);
        }
    }
})

app.mount('#app');