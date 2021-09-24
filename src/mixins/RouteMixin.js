export default {
    methods:{
        async navigate(route){
           await this.$router.push(route).catch(err=>console.log(`Error wirh routing ${err}`))
        },
        // Из-за того, что у стандартных ошибок laravel другой формат, приходится их парсить по разному.
        parseErrors(errors)
        {
           let errorsArray = [];
                if(Array.isArray(errors))
                {
                    for (let error of errors) {
                        for (const [, value] of Object.entries(error)) {
                            errorsArray.push(value)
                        }
                    }
                }
                else
                {
                    for (const [, values] of Object.entries(errors)) {
                        for(let val of values) {
                            errorsArray.push(val)
                        }

                    }
                }
            return errorsArray;
            }

        }
}

