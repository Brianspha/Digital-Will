import "./HelperFunctions.sol";
pragma solidity ^0.4.24;

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
    function register(string Name, string Lname, string id) public returns(string msg){
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)){
            msg = "Error!";
            return msg;
        }
        if(everyone[msg.sender].Activated){
            msg = "Already Registered!";
            return msg;
        }
        People memory ppl = People(msg.sender,Name,Lname,id,0,true);
        everyone[msg.sender] = ppl;
        msg = "Successfully added!";
        return msg;
    }
    
    function createWill(string Name, string Id, string[] Asset) public returns(string msg){
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)){
            msg = "Error!";
            return msg;
        }
        if(!everyone[msg.sender].Activated){
            msg = "Client not registered";
            return msg;
        }
        Will memory will = Will(Name,Id, Asset);
        everyone[msg.sender].passwills[everyone[msg.sender].Index] = will;
        msg = "Will successfully created";
        everyone[msg.sender].Index++;
        return msg; 
    }

    function deleteWill(uint256 ind) public returns(string msg){
        if(!everyone[msg.sender].Activated){
            msg = "Client not registered";
            return msg;
        }
        if(ind<=0){
            msg = "Client has no wills";
            return msg;
        }
        delete everyone[msg.sender].passwills[ind];
        msg = "Successfully deleted!";
        return msg;
    } 
    
    function editWill(uint256 ind,string[] Asset) public returns(string msg){
        if(!everyone[msg.sender].Activated){
            msg = "Client not registered";
            return msg;
        }
        if(ind<=0){
            msg = "Client has no wills";
            return msg;
        }
        delete everyone[msg.sender].passwills[ind].assets;
        everyone[msg.sender].passwills[ind].assets = Asset;
        msg = "Successfully Edited";
        return msg;
    }
}