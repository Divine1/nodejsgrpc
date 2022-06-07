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

exports.longGreet = (call,callback)=>{
    console.log("LongGreet was invoked");
    let greet = "";
    call.on("data",(req)=>{
        console.log(req.getFirstName());
        greet += `hello ${req.getFirstName()} \n`;
    })
    call.on('end',()=>{
        const res = new pb.GreetResponse().setResult(greet);
        callback(null,res);
    })
}

exports.greetEveryone = (call,_)=>{
    console.log("greetEveryone is invoked");

    call.on("data",(req)=>{
        console.log("received request ",req)
        const res = new pb.GreetResponse().setResult(`hey ${req.getFirstName()}`);
        console.log("sending response ",res,res.getResult());
        call.write(res);
    })
    call.on("end",()=>{
        call.end();
    })
};