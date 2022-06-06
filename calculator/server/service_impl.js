const {SumResponse} = require("./../proto/sum_pb.js");
const {PrimeResponse} = require("./../proto/primes_pb");
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
