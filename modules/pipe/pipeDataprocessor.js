const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
class pipeDataprocessor{
    async createPipe(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('pipe').insertOne(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async createChart(value){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('chart').insertOne(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    async getMyPipe(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('chart').find({"userID":id}).toArray()
           
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async getDetailPipe(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("pipe").find({"chartID":id}).sort({"date":-1}).toArray()
            console.log(result)
            console.log(result)
            responseData.getSuccessResponseData([result[0]])
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async filterDate(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("pipe").find({
                "chartID":request.id,
                date: {
                $gte:new Date(request.startDate),
                $lt:new Date(request.endDate)
            }}).toArray()
            console.log(request)
            console.log(request)
            console.log(request)

            if(result.length>0){
                var tempoOBj=[]
                var temrequest=result[0].pipeValue
                for(var l=0;l<temrequest.length;l++){
                    var request={
                        label:temrequest[l].label,
                        value:0
                    }
                    tempoOBj.push(request)
                } 

                console.log(tempoOBj)
                console.log(tempoOBj)
                console.log(tempoOBj)

            

                if(result.length>1){
                    var returnObj={
                        "chartID" : result[0].chartID,
                        "date" : request.startDate+"__"+request.endDate,
                        "pipeValue" : tempoOBj,
                        "chartValue" : [
                            
                        ]
                    }
                    var allTotal=0
                    for(var z=0;z<result.length;z++){
                        var loop=result[z]
                        console.log(loop)
                        console.log(loop)
                        const total = loop.pipeValue.reduce((accumulator, object) => {
                            var number=parseInt(object.value)
                            return accumulator + number;
                        }, 0);
                        console.log(total)
                        allTotal+=total
                        console.log(allTotal)
                        console.log(allTotal)
                        
                        for(var i=0;i<loop.pipeValue.length;i++){
                            var label=loop.pipeValue[i].label
                            console.log(label)
                            console.log(label)
                            var obj=tempoOBj.filter(x=>x.label===label)
                            console.log(obj)
                            console.log(loop.pipeValue[i].value)
                            if(obj.length>0){
                                obj[0].value+=parseInt(loop.pipeValue[i].value)
                            }
                            
                        } 
                    } 

                    console.log(allTotal)
                    console.log(tempoOBj[i])
                    console.log(allTotal)

                    var percentageTotal=0

                    var testCalculate1Total=0
                
                    for(var i=0;i<tempoOBj.length;i++){
                        const calcualtion = (tempoOBj[i].value/allTotal) * 100

                        var testCalculate1=(100 * tempoOBj[i].value) / allTotal
                        console.log(testCalculate1)
                        console.log(testCalculate1)
                        testCalculate1Total+=testCalculate1

                       
                    
                        var randomColor = Math.floor(Math.random()*16777215).toString(16)
                        var object={
                            percentage: calcualtion,
                            color: '#'+randomColor,
                        }
                        percentageTotal+=calcualtion
                        returnObj.chartValue.push(object)
                    } 
                    console.log(percentageTotal)
                    console.log(testCalculate1Total)
                    console.log([returnObj])
                    responseData.getSuccessResponseData([returnObj])
                }
                else{
                    console.log(result)
                    responseData.getSuccessResponseData(result)
                }


            }
            else{
                console.log(result)
                responseData.getSuccessResponseData(result)
            }
            

            
            
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    


    
}

module.exports=new pipeDataprocessor()