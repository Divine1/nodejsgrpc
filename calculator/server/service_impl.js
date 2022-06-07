const grpc = require("@grpc/grpc-js");
const {SumResponse} = require("./../proto/sum_pb.js");
const {PrimeResponse} = require("./../proto/primes_pb");
const {AvgResponse } = require("./../proto/avg_pb");
const {MaxResponse} = require("./../proto/max_pb");

const {SqrtResponse} = require("./../proto/sqrt_pb")
// this method name should be same as the package name present in greet.proto file
exports.sum = (call,callback)=>{
    console.log("calculator was invoked")
    const res = new SumResponse().setResult(
        call.request.getFirstNumber() + call.request.getSecondNumber()

        );

    callback(null,res);
}




exports.primes = (call,_)=>{
    console.log("primes was invoked");
    let number = call.request.getNumber();
    let divisor =2;
    const res = new PrimeResponse();

    while(number >1){
        if(number % divisor ==0){
            res.setResult(divisor);
            call.write(res);
            number /=divisor;
        }
        else{
            ++divisor;
        }
    }
    call.end();
}


exports.avg = (call,callback)=>{
    console.log("avg was invoked");

    let count = 0.0;
    let total = 0.0;

    call.on('data',(req)=>{
        console.log(req.getNumber())
        total += req.getNumber();
        ++count;
    })
    call.on("end",()=>{
        const res = new AvgResponse().setResult(total/count);
        console.log("server ended")
        callback(null,res);
        
    })

}
exports.max = (call,_)=>{
    console.log("max was invoked");

    let max=0;
    call.on("data",(req)=>{
        const number = req.getNumber();
        console.log("number ",number)
        if(number > max){
            max=number;
            const res = new MaxResponse().setResult(number);
            call.write(res);
        }
    });
    call.on("end",()=>{
        call.end();
    })
}

exports.sqrt = (call,callback)=>{
    console.log("sqrt was invoked");
    const number = call.request.getNumber();

    if(number<0){
        callback({
            code : grpc.status.INVALID_ARGUMENT,
            message : `Number cannot be negative, received ${number}`
        })
    }
    else{
        const response = new SqrtResponse()
        .setResult(Math.sqrt(number));

        callback(null,response);
    }
}