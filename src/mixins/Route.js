export default {
    methods:{
        async navigate(route){
           await this.$router.push(route).catch(()=>{})
        },
        // Из-за того, что у стандартных ошибок laravel другой формат, приходится их парсить по разному.
        parseErrors(errors)
        {
           let errorsArray = [];
                    for (const [, values] of Object.entries(errors)) {
                        for(let val of values) {
                            errorsArray.push(val)
                        }

                    }

            return errorsArray;
            }

        }
}

