const grpc = require("@grpc/grpc-js")

const {CalculatorServiceClient} = require("../proto/calculator_grpc_pb");
const {SumRequest} = require("./../proto/sum_pb")
function doSum(client){
    console.log("doCalculator was invoked")
    const req = new SumRequest().setFirstNumber(1)
    .setSecondNumber(2);
    
    client.sum(req,(err,res)=>{
        if(err){
            console.log("doCalculator sum err ",err )
        }
        else{
            console.log("doCalculator sum res ", res.getResult());
        }
    })
}

function main(){
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient("localhost:50051",creds);

    doSum(client);
    client.close();
}
main();