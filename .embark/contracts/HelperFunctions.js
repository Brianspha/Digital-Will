import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let HelperFunctionsJSONConfig = {"contract_name":{"className":"HelperFunctions","args":[],"code":"608060405234801561001057600080fd5b506103bf806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","runtimeBytecode":"6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","realRuntimeBytecode":"6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","swarmHash":"002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa97242553","gasEstimates":{"creation":{"codeDepositCost":"191800","executionCost":"232","totalCost":"192032"},"external":{"bytes32ToString(bytes32)":"infinite","isStringNullorEmpty(string)":"infinite","stringToBytes32(string)":"infinite"}},"functionHashes":{"bytes32ToString(bytes32)":"9201de55","isStringNullorEmpty(string)":"3b269000","stringToBytes32(string)":"cfb51928"},"abiDefinition":[{"constant":false,"inputs":[{"name":"value","type":"string"}],"name":"isStringNullorEmpty","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"GeneralLogger","type":"event"}],"filename":"HelperFunctions.sol","gas":"auto","type":"file","deploy":true,"_gasLimit":false,"error":false,"realArgs":[],"deployedAddress":"0x89efE32F1BDABdAfde9830E4bA01794ab43E9071"},"address":"0x89efE32F1BDABdAfde9830E4bA01794ab43E9071","code":"608060405234801561001057600080fd5b506103bf806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","runtime_bytecode":"6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","real_runtime_bytecode":"6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633b269000811461005b5780639201de55146100c8578063cfb5192814610155575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100b49436949293602493928401919081908401838280828437509497506101c09650505050505050565b604080519115158252519081900360200190f35b3480156100d457600080fd5b506100e06004356101c5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561011a578181015183820152602001610102565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101ae9436949293602493928401919081908401838280828437509497506103739650505050505050565b60408051918252519081900360200190f35b511590565b6040805160208082528183019092526060918291600091829182918591908082016104008038833901905050945060009350600092505b6020831015610289576008830260020a870291507fff0000000000000000000000000000000000000000000000000000000000000082161561027e5781858581518110151561024757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909301925b6001909201916101fc565b836040519080825280601f01601f1916602001820160405280156102b7578160200160208202803883390190505b509050600092505b838310156103695784838151811015156102d557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002818481518110151561032e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909201916102bf565b9695505050505050565b60006060610380836101c0565b1561038a57600080fd5b505060200151905600a165627a7a72305820002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa972425530029","swarm_hash":"002bd6e70a2a9e4b06276c76e345d2903111ff7151cec1bac8c553fa97242553","gas_estimates":{"creation":{"codeDepositCost":"191800","executionCost":"232","totalCost":"192032"},"external":{"bytes32ToString(bytes32)":"infinite","isStringNullorEmpty(string)":"infinite","stringToBytes32(string)":"infinite"}},"function_hashes":{"bytes32ToString(bytes32)":"9201de55","isStringNullorEmpty(string)":"3b269000","stringToBytes32(string)":"cfb51928"},"abi":[{"constant":false,"inputs":[{"name":"value","type":"string"}],"name":"isStringNullorEmpty","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"GeneralLogger","type":"event"}]};
let HelperFunctions = new EmbarkJS.Contract(HelperFunctionsJSONConfig);

__embarkContext.execWhenReady(function() {

HelperFunctions.setProvider(web3.currentProvider);

HelperFunctions.options.from = web3.eth.defaultAccount;

});
export default HelperFunctions;