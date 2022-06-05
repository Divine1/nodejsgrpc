npm i google-protobuf @grpc/grpc-js

npm i grpc-tools -D

./node_modules/.bin/grpc_tools_node_protoc --js_out=. --grpc_out=. dummy.proto