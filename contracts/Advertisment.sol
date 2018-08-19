import "./HelperFunctions.sol";
import "./Lawyer.sol";
pragma solidity ^0.4.24;

contract Advertisment is HelperFunctions{
    Lawyer LawyerLedger;
    constructor() public{

    }

    function createAdvert() public view returns(string message){
        bool success = LawyerLedger.adCreate();
        return success ? "Advert created! This advert will be up for 24 hours":"Insufficient Points";
    }

}