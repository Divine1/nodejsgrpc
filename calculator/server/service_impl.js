const {SumResponse} = require("./../proto/sum_pb.js");

// this method name should be same as the package name present in greet.proto file
exports.sum = (call,callback)=>{
    console.log("calculator was invoked")
    const res = new SumResponse().setResult(
        call.request.getFirstNumber() + call.request.getSecondNumber()

        );

    callback(null,res);
}

