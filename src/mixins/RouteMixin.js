export default {
    methods:{
        async navigate(route){
           await this.$router.push(route).catch(err=>console.log(`Error wirh routings ${err}`))
        }
    }
}