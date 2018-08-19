import "./HelperFunctions.sol";
import "./Client.sol";
pragma solidity ^ 0.4 .24;

contract Lawyer is HelperFunctions {
    struct Rep {
        address uid;
        string name;
        string lname;
        string ID;
        string law_ID;
        uint256 Points;
        mapping(uint256 => PendingWill) PendingWills;
        Advert ad;
        bool activated;
    }
    Client ClientLedger;
    mapping(address => Rep) lawyers;

    constructor(address clientledgerAddress) public {
        require(msg.sender != address(0));
        require(clientledgerAddress != address(0));
        ClientLedger = Client(clientledgerAddress);
    } 
    function register(string Name, string Lname, string id, string law_id) public returns(string message) {
        if (isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id) || isStringNullorEmpty(law_id)) {
            message = "Error!";
            return message;
        }
        if (lawyers[msg.sender].activated) {
            message = "Already Registered!";
            return message;
        }
        Advert memory ad1 = Advert(msg.sender, "0", false);
        Rep memory rep = Rep(msg.sender, Name, Lname, id, law_id, 0, ad1, false);
        lawyers[msg.sender] = rep;
        message = "Successfully added!";
        return message;
    }

    function editProfile(string Name, string Lname, string id, string law_id) public returns(string message) {
        if(isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id) || isStringNullorEmpty(law_id)) {
            message = "Error!";
            return message;
        }
        if(lawyers[msg.sender].activated){
            message = "Already Registered!";
            return message;
        }
        lawyers[msg.sender].name = Name;
        lawyers[msg.sender].lname = Lname;
        lawyers[msg.sender].ID = id;
        lawyers[msg.sender].law_ID = law_id;
        message = "Successfully Updated!";
        return message;
    }
    function Accept(uint256 willIndex) public returns(string message) {
        if (!lawyers[msg.sender].activated) {
            message = "Lawyer not registered";
            return message;
        }
        if (willIndex < 0) {
            message = "Will does not exist";
            return message;
        }
        PendingWill memory temp = lawyers[msg.sender].PendingWills[willIndex];
        if (temp.IsPending) {
         bool success;
         uint indx;
         (success,indx) = ClientLedger.SignWill(temp.Owner,msg.sender);
         ClientLedger.processWill(temp.Owner,success);
         lawyers[msg.sender].Points += 100;
         temp.IsPending = false;
         message = success?"Successfully signed will":"An error occured please ensure that you have the correct details";
         return message;
        }
        message = "Sorry, it's already signed.";
        return message;
    }

    function Reject(uint256 willIndex) public returns(string message) {
        if (!lawyers[msg.sender].activated) {
            message = "Lawyer not registered";
            return message;
        }
        if (willIndex < 0) {
            message = "Will does not exist";
            return message;
        }
        PendingWill memory temp = lawyers[msg.sender].PendingWills[willIndex];
        if (temp.IsPending) {
         bool success;
         uint indx;
         (success,indx)=ClientLedger.SignWill(temp.Owner,msg.sender);
         ClientLedger.processWill(temp.Owner,success);
         lawyers[msg.sender].Points += 80;
         temp.IsPending = false;
         message = success?"Successfully rejected will":"An error occured please ensure that you have the correct details";
         return message;
        }
        message = "Sorry, it's already signed.";
        return message;
    }
    
    function adCreate() public view returns(bool success){
        if(lawyers[msg.sender].Points<100){
            success = false;
            return success;
        }
        success= true;
        return success;
    } 

}