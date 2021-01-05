export default{
    data(){
        return{
            
                msg:"test"
            
        }
    },
    mounted(){
        this.Alert();
    },
    methods:{
        Alert(){
            alert(this.test1)
        }
    }
}