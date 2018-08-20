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
        mapping (uint256=> PendingWill) Approved;
        Advert ad;
        PendingWill currentPending;
        bool activated;
    }
    Client ClientLedger;
    mapping(address => Rep) lawyers;
    PendingWill pending;

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
        PendingWill memory temp = PendingWill(0,address(0),false,0);
        Rep memory rep = Rep(msg.sender, Name, Lname, id, law_id, 0, ad1,temp ,true);
        lawyers[msg.sender] = rep;
        message = "Successfully added!";
        return message;
    }
    function showLawyer() public view returns(string Name,string Lname, string Id,string LAWID){
        if(! lawyers[msg.sender].activated){
            Name = "Not Registered,";
            Lname = "Not Registered,";
            Id = "Not Registered,";
            LAWID = "Not Registered";  
            return (Name,Lname,Id,LAWID);
        }
        Name = lawyers[msg.sender].name;
        Lname = lawyers[msg.sender].lname;
        Id = lawyers[msg.sender].ID;  
        LAWID = lawyers[msg.sender].law_ID;
        return (Name,Lname,Id,LAWID);
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
        PendingWill memory temp = lawyers[msg.sender].currentPending;
      //  if (temp.IsPending) {
         bool success;
         uint indx;
         emit GeneralLogger(msg.sender);
         emit GeneralLogger(pending.Owner);
         (success,indx) = ClientLedger.SignWill(pending.Owner,msg.sender);
         ClientLedger.processWill(pending.Owner,success);
         lawyers[msg.sender].Points += 100;
         temp.IsPending = false;
         message = success?"Successfully signed will":"An error occured please ensure that you have the correct details";
         emit GeneralLogger(message);
         return message;
     //   }
        message = "Sorry, it's already signed.";
        emit GeneralLogger(message);
        emit GeneralLogger(temp.UIDClient);
        return message;
    }
   function  RequestWillApproval(uint256 indexClient,address lawyerAddress) public returns(string message)  {
      if (!lawyers[msg.sender].activated) {
            message = "Lawyer not registered";
            emit GeneralLogger(message);
            return message;
        }
        message ="Will sent for approval";
        emit GeneralLogger(message);
       lawyers[lawyerAddress].currentPending = PendingWill(indexClient,msg.sender,true,0);
       pending = PendingWill(indexClient,msg.sender,true,0);
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

    function showAd() public view returns(string Name, string Lname,string descrip){
        Name = lawyers[msg.sender].name;
        Lname = lawyers[msg.sender].lname;
        descrip = "Family Law. Bankruptcy. Litigation";
        return (Name,Lname,descrip);
    }
}