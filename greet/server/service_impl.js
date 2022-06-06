const pb = require("./../proto/greet_pb");

// this method name should be same as the package name present in greet.proto file
exports.greet = (call,callback)=>{
    console.log("greet was invoked")
    const res = new pb.GreetResponse()
    .setResult(`Hello ${call.request.getFirstName()}`);

    callback(null,res);
}

exports.greetManyTimes = (call,callback)=>{
    console.log("GreetManyTimes was invoked");
    const res = new pb.GreetResponse();

    for(let i=0;i<10;++i){
        res.setResult(`hello ${call.request.getFirstName()} - number ${i}`);
        call.write(res);
    }
    call.end();
}