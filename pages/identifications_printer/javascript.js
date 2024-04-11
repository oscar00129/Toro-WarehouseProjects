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
                    'AAA3',
                    'BODEGA',
                    'CALIDAD',
                    'CONTEOS',
                    'DEVO',
                    'EXPANSION',
                    'EMBA',
                    'IMPULSE',
                    'REC3',
                    'TRACSO'
                ]
            }
        }
    },
    mounted(){
        this.materials.push({ part_number: '', quantity: 0, pages: 1, parcial: false });
        this.getCurrentDate();
        this.getCurrentTime();
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
        changePages(index, event){
            if(event && event.target) event.target.value = this.materials[index].pages;

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
        },
        getCurrentTime(){
            let time = new Date();
            return `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
        },
        getCurrentShift(){
            let currentTime = new Date();

            let firstShiftStart = new Date();
            firstShiftStart.setHours(6,30,0);
            let firstShiftEnd = new Date();
            firstShiftEnd.setHours(16,5,0);

            let secondShiftStart = new Date();
            secondShiftStart.setHours(16,5,1);
            let secondShiftEnd = new Date();
            secondShiftEnd.setHours(23,59,59);

            let secondShiftStart2 = new Date();
            secondShiftStart2.setHours(0,0,0);
            let secondShiftEnd2 = new Date();
            secondShiftEnd2.setHours(0,55,0);

            if(currentTime >= firstShiftStart && currentTime <= firstShiftEnd){
                return "1ST SHIFT";
            }else if(currentTime >= secondShiftStart && currentTime <= secondShiftEnd){
                return "2ND SHIFT";
            }else if(currentTime >= secondShiftStart2 && currentTime <= secondShiftEnd2){
                return "2ND SHIFT";
            }else{
                return "2ND SHIFT OVERTIME";
            }
        }
    }
})

app.mount('#app');