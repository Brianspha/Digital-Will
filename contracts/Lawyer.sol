import "./HelperFunctions.sol";
pragma solidity ^0.4.24;

contract Lawyer is HelperFunctions {
    struct Rep{
        address uid;
        string name;
        string lname;       
        string id;
        string law_id;
        uint256 Points;
        mapping(uint256 => PendingWill)  PendingWills;
        Advert ad;
    }
    mapping(address => Rep) lawyers;
    //ad updating, incrementing point, point system, registering, 
    //100 points for accepting, 80 points for denying, 
    function register(string Name, string Lname, string id,string law_id, ) public returns(string message){
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id) || isStringNullorEmpty(law_id)){
            message = "Error!";
            return message;
        }
        if(everyone[msg.sender].Activated){
            message = "Already Registered!";
            return message;
        }
        Advert ad1 = Advert(msg.sender,"0" ,false);
        Rep memory rep = Rep(msg.sender,Name,Lname,id,law_id,0,ad1);
        lawyers[msg.sender] = rep;
        message = "Successfully added!";
        return message;
    }

    

    //function createAdvert
}