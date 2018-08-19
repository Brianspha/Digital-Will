import "./HelperFunctions.sol";
pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Client is HelperFunctions{
    //@Dev represents a client who wants to store a will on the blockchain
    struct People{
        address UID;
        string name;
        string lname;
        string ID;
        uint256 Index;
        mapping(uint256=>Will) passwills;
        bool Activated;//@Dev used to check if the client is registered or not
    }   
    mapping(address => People) everyone; //@Dev represents all clients who have registered on the system
    constructor () public 
    {

    }
    function register(string Name, string Lname, string id) public returns(string message){
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)){
            message = "Error!";
            return message;
        }
        if(everyone[msg.sender].Activated){
            message = "Already Registered!";
            return message;
        }
        People memory ppl = People(msg.sender,Name,Lname,id,0,true);
        everyone[msg.sender] = ppl;
        message = "Successfully added!";
        return message;
    }
    
    function createWill(string Name, string Id, string[] Asset) public returns(string message){
        if(isStringNullorEmpty(Name)  || isStringNullorEmpty(Id)){
            message = "Error!";
            return message;
        }
        if(! everyone[msg.sender].Activated){
            message = "Client not registered";
            return message;
        }
        Will memory will = Will(Name,Id, Asset);
        everyone[msg.sender].passwills[everyone[msg.sender].Index] = will;
        message = "Will successfully created";
        everyone[msg.sender].Index++;
        return message; 
    }

    function deleteWill(uint256 ind) public returns(string message){
        if(!everyone[msg.sender].Activated){
            message = "Client not registered";
            return message;
        }
        if(ind<=0){ 
            message = "Client has no wills";
            return message;
        }
        delete everyone[msg.sender].passwills[ind];
        message = "Successfully deleted!";
        return message;
    } 
    
    function editWill(uint256 ind,string[] Asset) public returns(string message){
        if(!everyone[msg.sender].Activated){
            message = "Client not registered";
            return message;
        }
        if(ind<=0){
            message = "Client has no wills";
            return message;
        }
        delete everyone[msg.sender].passwills[ind].assets;
        everyone[msg.sender].passwills[ind].assets = Asset;
        message = "Successfully Edited";
        return message;
    }
}