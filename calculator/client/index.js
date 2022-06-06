const grpc = require("@grpc/grpc-js")

const {CalculatorServiceClient} = require("../proto/calculator_grpc_pb");
const {SumRequest} = require("./../proto/sum_pb")
const {PrimeRequest} = require("./../proto/primes_pb");
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

function doPrimes(client){
    const req = new PrimeRequest().setNumber(12390392840);
    const call = client.primes(req);

    call.on("data",(res)=>{
        console.log("primtes ",res.getResult())
    })
}

function main(){
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient("localhost:50051",creds);

    //doSum(client);
    doPrimes(client);
    client.close();
}
main();