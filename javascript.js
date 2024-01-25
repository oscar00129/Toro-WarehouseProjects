const app = Vue.createApp({
    data() {
        return {
            message: "Hello World!",
            materials: [],
            materials_w_pages: [],
            select_data: {
                selected: '',
                areas: [
                    '',
                    'EXPANSION',
                    'EMBA',
                    'REC3'
                ]
            },
            shift_data: {
                selected: '1ST',
                shifts: [
                    '1ST', '2ND', '3RD'
                ]
            },
            includeDate: true
        }
    },
    mounted(){
        this.materials.push({ part_number: '', quantity: 0, pages: 1, parcial: false });
        this.getCurrentDate();
    },
    watch: {
        materials: {
            handler: function(newValue){
                this.materials_w_pages = [];
                this.materials.forEach(material => {
                    for(let i = 1; i <= material.pages; i++){
                        this.materials_w_pages.push(material);
                    }
                });
                
            },
            deep: true
        }
    },
    methods:{
        addMaterial(){
            this.materials.push({
                part_number: '',
                quantity: 0,
                pages: 1,
                parcial: false
            });
        },
        print(){
            var exceedLimitPages = false;
            this.materials.forEach(material => {
                material.pages = Math.round(material.pages);
                if(material.pages > 35) exceedLimitPages = true;
                if(material.pages < 0) material.pages = 0;
            });

            if(exceedLimitPages){
                alert("Limit of printable pages are 35, please select another quantity");
                return;
            }
            
            window.print();
        },
        duplicateItem(index){
            this.materials.splice(index + 1, 0, {
                part_number: this.materials[index].part_number,
                quantity: this.materials[index].quantity,
                pages: this.materials[index].pages,
                parcial: this.materials[index].parcial
            });
        },
        removeItem(index){
            this.materials.splice(index, 1);
        },
        changePages(index){
            this.materials[index].pages = Math.round(this.materials[index].pages);
            if(this.materials[index].pages > 35){
                this.materials[index].pages = 35;
            }else if(this.materials[index].pages < 0){
                this.materials[index].pages = 0;
            }
        },
        removeAll(){
            this.materials = [];
        },
        getCurrentDate(){
            let date = new Date();
            return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
        }
    }
})

app.mount('#app');