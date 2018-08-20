import "./HelperFunctions.sol";
pragma solidity ^ 0.4 .24;
pragma experimental ABIEncoderV2;

contract Client is HelperFunctions {
    //@Dev represents a client who wants to store a will on the blockchain
    struct People {
        address UID;
        string name;
        string lname;
        string ID;
        uint256 Index;
        mapping(uint256 => Will) passwills;
        Will CurrentPending;
        bool Activated; //@Dev used to check if the client is registered or not
    }
    PendingWill pending;
    mapping(address => People) everyone; //@Dev represents all clients who have registered on the system
    constructor() public {

    }

    function register(string Name, string Lname, string id) public returns(string message) {
        if (isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)) {
            message = "Error!";
            return message;
        }
        if (everyone[msg.sender].Activated) {
            message = "Already Registered!";
            return message;
        }
        Will memory will = Will("", "", "", "", address(0), address(0), address(0), 0, "");
        People memory ppl = People(msg.sender, Name, Lname, id, 0, will, true);
        everyone[msg.sender] = ppl;
        message = "Successfully added!";
        return message;
    }

    function showProfile() public view returns(string Name, string Lname, string Id) {
        if (!everyone[msg.sender].Activated) {
            Name = "Not Registered,";
            Lname = "Not Registered,";
            Id = "Not Registered,";
            return (Name, Lname, Id);
        }
        Name = everyone[msg.sender].name;
        Lname = everyone[msg.sender].lname;
        Id = everyone[msg.sender].ID;
        return (Name, Lname, Id);
    }

    function editProfile(string Name, string Lname, string id) public returns(string message) {
        if (isStringNullorEmpty(Name) || isStringNullorEmpty(Lname) || isStringNullorEmpty(id)) {
            message = "Error!";
            emit GeneralLogger(message);
            return message;
        }
        if (!everyone[msg.sender].Activated) {
            message = "Not Registered!";
            emit GeneralLogger(message);
            return message;
        }
        everyone[msg.sender].name = Name;
        everyone[msg.sender].lname = Lname;
        everyone[msg.sender].ID = id;
        message = "Successfully updated!";
        emit GeneralLogger(message);
        return message;
    }
    function createWill(string will1, string Asset, string Benef) public returns(string message) {
        if (isStringNullorEmpty(will1) || isStringNullorEmpty(Asset) || isStringNullorEmpty(Benef)) {
            message = "Error!";
            emit GeneralLogger(Asset);
            emit GeneralLogger(message);
            return message;
        }
        if (!everyone[msg.sender].Activated) {
            message = "Client not registered";
            emit GeneralLogger(Asset);
            emit GeneralLogger(message);
            return message;
        }
        Will memory will = Will(everyone[msg.sender].name, everyone[msg.sender].ID, Asset, Benef, address(0), address(0), address(0), 0, will1);
        everyone[msg.sender].passwills[everyone[msg.sender].Index] = will;
        message = "Will successfully created";
        everyone[msg.sender].CurrentPending = will;
        emit GeneralLogger(message);
        emit GeneralLogger(Asset);
        everyone[msg.sender].Index++;
        return message;
    }

    function deleteWill(uint256 ind) public returns(string message) {
        if (!everyone[msg.sender].Activated) {
            message = "Client not registered";
            return message;
        }
        if (ind <= 0) {
            message = "Client has no wills";
            return message;
        }
        delete everyone[msg.sender].passwills[ind];
        message = "Successfully deleted!";
        return message;
    }

    function viewWill() public view returns(string Name, string Lname, string asset, string bene, string will3) {
        if (!everyone[msg.sender].Activated) {
            Name = "false";
            Lname = "false";
            //id = "false";
            asset = "";
            bene = "";
            will3 = "false";
        }
        Name = everyone[msg.sender].name;
        Lname = everyone[msg.sender].lname;
        //id = everyone[msg.sender].ID;
        asset = everyone[msg.sender].CurrentPending.assets;
        bene = everyone[msg.sender].CurrentPending.benef;
        will3 = everyone[msg.sender].CurrentPending.will;

        return (Name, Lname, asset, bene, will3);
    }

    function editWill(uint256 ind, string willnew,string Asset, string Benef) public returns(string message) {
        if (!everyone[msg.sender].Activated) {
            message = "Client not registered";
            emit GeneralLogger(message);
            return message;
        }
        if (ind <= 0) {
            message = "Client has no wills";
            emit GeneralLogger(message);
            return message;
        }
        everyone[msg.sender].passwills[ind].assets = Asset;
        everyone[msg.sender].passwills[ind].will = willnew;
        everyone[msg.sender].passwills[ind].benef = Benef;
        everyone[msg.sender].CurrentPending=everyone[msg.sender].passwills[ind];
        message = "Successfully Edited";
        emit GeneralLogger(message);
        return message;
    }

    function SignWill(address willHolder, address lawyerHolder) public returns(bool success, uint indx) {
        indx = everyone[willHolder].Index - 1;
        if (willHolder == address(0) || lawyerHolder == address(0) ||  willHolder == everyone[willHolder].passwills[0].Witness1 || willHolder == everyone[willHolder].passwills[0].Witness2) {
            success = false;
            return (success, indx);
        }
        success = true;
        everyone[willHolder].CurrentPending.LawyerAddress = lawyerHolder;
        return (success, indx);
    }

    function processWill(address willHolder, bool Approved) public {
        if (Approved) {
            everyone[willHolder].passwills[everyone[willHolder].Index].approved = 2;
        } else {
            everyone[willHolder].passwills[everyone[willHolder].Index].approved = 1;
        }
    }
}