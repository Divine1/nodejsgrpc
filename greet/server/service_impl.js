const pb = require("./../proto/greet_pb");

// this method name should be same as the package name present in greet.proto file
exports.greet = (call,callback)=>{
    console.log("greet was invoked")
    const res = new pb.GreetResponse()
    .setResult(`Hello ${call.request.getFirstName()}`);

    callback(null,res);
}

