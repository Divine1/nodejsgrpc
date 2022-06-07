const grpc = require("@grpc/grpc-js")

const {GreetServiceClient} = require("../proto/greet_grpc_pb");
const {GreetRequest} = require("./../proto/greet_pb")
function doGreet(client){
    console.log("doGreet was invoked")
    const req = new GreetRequest().setFirstName('Divine')
    
    client.greet(req,(err,res)=>{
        if(err){
            console.log("err ",err )
        }
        else{
            console.log("greet: res ", res.getResult());
        }
    })
}

function doGreetManyTimes(client){
    console.log("doGreetManyTimes was invoked");
    const req = new GreetRequest().setFirstName("divine");

    const call = client.greetManyTimes(req);
    call.on("data",(res)=>{
        console.log("greetmanytimes ",res.getResult());
    })

    call.on('end',()=>{
        console.log("greetmanytimes ended")
    })
}

function doLongGreet(client){
    console.log("doLongGreet was invoked");
    const names = ["lion","tiger","giraffe"];
    const call = client.longGreet((err,res)=>{
        if(err){
            console.log("err ",err);
        }
        else{
            console.log("longGreet ",res.getResult());
        }
    });

    names.map((name)=>{
        return new GreetRequest().setFirstName(name);
    }).forEach((req)=>{
        call.write(req);
    });
    call.end();
}

function doGreetEveryone(client){
    console.log("doGreetEveryone was invoked");
    const names = ["lion","tiger","giraffe"];
    const call = client.greetEveryone();

    call.on("data",(res)=>{
        console.log("greeteveryone ",res.getResult());
    })
    names.map((name)=>{
        return new GreetRequest().setFirstName(name);
    }).forEach((req)=>{
        call.write(req);
    });
    call.end();
}

function main(){
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new GreetServiceClient("localhost:50051",creds);

    //doGreet(client);
    //doGreetManyTimes(client);
   // doLongGreet(client);
   doGreetEveryone(client);
    client.close();
}
main();