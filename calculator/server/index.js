const grpc = require("@grpc/grpc-js")
const serviceImpl = require("./service_impl");
const {CalculatorServiceService} = require("./../proto/calculator_grpc_pb")
const addr = 'localhost:50051';


function cleanup(server){
    console.log("cleanup");
    if(server){
        server.forceShutdown();
    }
}

function main(){
    const server = new grpc.Server();
    const creds = grpc.ServerCredentials.createInsecure();

    process.on('SIGINT',()=>{
        cleanup(server);
    })
    server.addService(CalculatorServiceService,serviceImpl);

    server.bindAsync(addr,creds,(err,data)=>{

        if(err){
            cleanup(server);
        }
        else{
            console.log("data ",data)
            server.start();
            
        }
    })
    console.log(`listening on ${addr}`)
    
}
main();