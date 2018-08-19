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
        Will CurrentPending;
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
        string[] memory arr ; 
        Will memory will = Will("","",arr,arr,address(0),address(0),address(0),0);
        People memory ppl = People(msg.sender,Name,Lname,id,0,will,true);
        everyone[msg.sender] = ppl;
        message = "Successfully added!";
        return message;
    }
    
    function editProfile(string Name, string Lname, string id) public returns (string message){
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)){
            message = "Error!";
            return message;
        }
        if(everyone[msg.sender].Activated){
            message = "Already Registered!";
            return message;
        }
        everyone[msg.sender].name = Name;
        everyone[msg.sender].lname = Lname;
        everyone[msg.sender].ID = id;
        message = "Successfully updated!";
        return message;
    }

    function createWill(string Name, string Id, string[] Asset,string[] Benef) public returns(string message){
        if(isStringNullorEmpty(Name)  || isStringNullorEmpty(Id)){
            message = "Error!";
            return message;
        }
        if(! everyone[msg.sender].Activated){
            message = "Client not registered";
            return message;
        }
        Will memory will = Will(Name,Id, Asset,Benef,address(0),address(0),address(0),0);
        everyone[msg.sender].passwills[everyone[msg.sender].Index] = will;
        message = "Will successfully created";
        everyone[msg.sender].CurrentPending = will;
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
    
    function editWill(uint256 ind, string[] Asset, string[] Benef) public returns(string message){
        if(!everyone[msg.sender].Activated){
            message = "Client not registered";
            return message;
        }
        if(ind<=0){
            message = "Client has no wills";
            return message;
        }
        delete everyone[msg.sender].passwills[ind].assets;
        delete everyone[msg.sender].passwills[ind].benef;
        everyone[msg.sender].passwills[ind].assets = Asset;
        everyone[msg.sender].passwills[ind].benef = Benef;
        message = "Successfully Edited";
        return message;
    }
    function SignWill(address willHolder,address lawyerHolder) public returns (bool success,uint indx)
    {   
        indx = everyone[willHolder].Index - 1;
        if(willHolder == address (0) || lawyerHolder == address(0) || willHolder==lawyerHolder || willHolder==everyone[willHolder].passwills[0].Witness1 || willHolder==everyone[willHolder].passwills[0].Witness2){
            success =false;
            return (success,indx);
        }
        success =true;
        everyone[willHolder].CurrentPending.LawyerAddress=lawyerHolder;
        return (success,indx);
    }

    function processWill(address willHolder,bool Approved) public{
        if(Approved){
            everyone[willHolder].passwills[everyone[willHolder].Index].approved=2;
        }else{
            everyone[willHolder].passwills[everyone[willHolder].Index].approved=1;
        }
    }
}