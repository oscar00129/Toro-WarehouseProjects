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
            }
        }
    },
    mounted(){
        this.materials.push({ part_number: '', quantity: 0, pages: 1 });
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
                pages: 1
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
        }
    }
})

app.mount('#app');