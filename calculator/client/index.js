const grpc = require("@grpc/grpc-js")

const {CalculatorServiceClient} = require("../proto/calculator_grpc_pb");
const {SumRequest} = require("./../proto/sum_pb")
const {PrimeRequest} = require("./../proto/primes_pb");
const {AvgRequest} = require("./../proto/avg_pb")
const {MaxRequest} = require("./../proto/max_pb")

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
    const req = new PrimeRequest().setNumber(97);
    const call = client.primes(req);

    call.on("data",(res)=>{
        console.log("primtes ",res.getResult())
    })
    call.on("end",()=>{
        console.log("primes - server ended the stream")

    })
}

function doAvg(client){
    console.log("doAvg was invoked");
    const numbers = [...Array(11).keys()].slice(1);
    const call = client.avg((err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Result ",res.getResult());
        }
    });

    numbers.map((number)=>{
        return new AvgRequest().setNumber(number);
    }).forEach((req)=>{
        call.write(req);
    });
    call.end();

}

function doMax(client){
    console.log("doMax was invoked");

    const numbers = [4,6,2,19,4,6,2];
    const call = client.max()

    call.on("data",(res)=>{
        console.log("max ",res.getResult());
    })
    numbers.map((number)=>{
        return new MaxRequest().setNumber(number);
    }).forEach((req)=>{
        call.write(req);
    })

    call.end();
}

function main(){
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient("localhost:50051",creds);

    //doSum(client);
    //doPrimes(client);
    //doAvg(client);
    doMax(client);
    client.close();
}
main();