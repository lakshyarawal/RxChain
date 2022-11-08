// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity  >=0.5.0 <0.9.0;

import "./counter.sol";
contract RxChain is counter{
    
    address Doc;
    address Pharm;
    address payable Pat;

    //uint256 PresID;
    counter private PresID;

    //to check if the prescription is valid
    bool isvalid=false;
  
    struct PresDetails{
           string PresDate;
           address Pat;
           address Doc;
           string[] medicines;}

    struct Patient{
   
    uint256 age;
    string name;
    string email;
    address payable Pat;}

    struct Doctor{

    uint256 age;
    string name;
    string email;
    //clinic or hospital name
    string clinic_name;
    address Doc;}

    struct Pharmacist{

    uint256 age;
    string name;
    string email;
    //store address
    string store_address;
    address Pharm;}



    mapping(uint256=>PresDetails) public prescription;
    mapping (address=>Patient) public patient_membership;
    mapping (address=>Doctor) public doctor_membership;
    mapping (address=>Pharmacist) public pharmacist_membership;
    
    //doctors address mapped to the whether they exist or not
    mapping(address => bool) public genuine_doctors;
    
    //doctors_list 
    Doctor[] public doctors_list;

    //patients_list to add_new_patients
    Patient[] public patients_list;

    //pharmacists_list to add_new_pharmacists
    Pharmacist[] public pharmacists_list;

     //prescription_list 
    PresDetails[] public prescription_list;

    //deposits mapping
    mapping (address=>uint256) private deposits;
     
  
    modifier onlyDoctor{
             require(msg.sender == Doc);
             _;
    }
    modifier onlyPatient{
             require(msg.sender == Pat);
             _;
    }
    modifier onlyPharmacist{
           require(msg.sender==Pharm);
             _;
    }
    modifier DoctorListed(address _doc) {
    require(genuine_doctors[_doc] == false,"Doctor is not there");
    _;
    }
     modifier DoctorAlreadyListed(address _doc) {
    require(genuine_doctors[_doc] == true,"Doctor is there");
    _;
    }
   
   //Registering the new Doctor
    function Doctor_Register(address doc_new,string memory _name, uint256 age,string memory _email,string memory _clinic_name) public   
    DoctorListed(doc_new) returns(bool) 
  {
     
    doctors_list.push(Doctor({name:_name, age:age,email:_email,clinic_name:_clinic_name,Doc:doc_new}));
    doctor_membership[doc_new]=Doctor({name:_name, age:age,email:_email,clinic_name:_clinic_name,Doc:doc_new});
    genuine_doctors[doc_new]=true;
      
    return true;
  }
   //De-Registering the Doctor
   function Doctor_Unregister(address doc_new) onlyDoctor public   
    DoctorAlreadyListed(doc_new) returns(bool) 
  {
     //deleting from array
     for(uint256 i = 0; i < doctors_list.length - 1; i++){
        if(doctors_list[i].Doc == doc_new){
          doctors_list[i] = doctors_list[i+1];
        }
      }
    //deleteing from mapping
    delete doctor_membership[doc_new];
    genuine_doctors[doc_new]=false;
    return true;
  }
   //Registering the new Patient
   function Patient_Register(address payable pat_new,string memory _name, uint256 age,string memory _email) public   
     returns(bool) 
  {
     
    patients_list.push(Patient({name:_name, age:age,email:_email,Pat:pat_new}));
    patient_membership[pat_new]=Patient({name:_name,age:age,email:_email,Pat:pat_new});
    return true;
  }

  //Unregistering the new Patient
   function Patient_Unegister(address payable pat_new) public   
     returns(bool) 
  {
     //deleting from array
     for(uint256 i = 0; i < patients_list.length - 1; i++){
        if(patients_list[i].Pat == pat_new){
          patients_list[i] = patients_list[i+1];
        }
      }
    //deleting from mapping
    delete patient_membership[pat_new];

   
    return true;
  }
   //Registering the new pharmacist
    function Pharmacy_Register(address pharm_new,string memory _name, uint256 age,string memory _email,string memory _store_address) public   
    onlyPharmacist returns(bool) 
  {
      
    pharmacists_list.push(Pharmacist({name:_name, age:age,email:_email,store_address:_store_address,Pharm:pharm_new}));
    pharmacist_membership[pharm_new]=Pharmacist({name:_name, age:age,email:_email,store_address:_store_address,Pharm:pharm_new});
  
    return true;
  }
 //Unregistering the pharmacist

    function Pharmacy_Unregister(address pharm_new) public   
    onlyPharmacist returns(bool) 
  {
     //deleting from array
     for(uint256 i = 0; i < pharmacists_list.length - 1; i++){
        if(pharmacists_list[i].Pharm == pharm_new){
          pharmacists_list[i] = pharmacists_list[i+1];
        }
      }
    //deleting from mapping
    delete pharmacist_membership[pharm_new];

    return true;
  }
  //adding prescription
  function Prescription_Register(address payable _Pat, address _Doc, string memory _PresDate,string[] memory medicines) public   
    onlyDoctor returns(bool) 
  {
     

    prescription_list.push(PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines}));
    prescription[PresID.get()]=PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines});
    PresID.increment();
    return true;
  }




    //validating the prescription
    function validate_prescription(address _pat, address _doc, uint pres_id) public onlyPharmacist returns (bool) {

        if(keccak256(abi.encodePacked(patient_membership[_pat].Pat))==keccak256(abi.encodePacked((prescription[pres_id].Pat))))
        {
                 if(keccak256(abi.encodePacked(doctor_membership[_doc].Doc))==keccak256(abi.encodePacked( prescription[pres_id].Doc)))
                 
                {isvalid=true;
                return true;}
           
        }
        return false;
       
    
    }
    /*
    function pay_to_pharmacist(uint256 amount) public payable onlyPatient returns (bool)
    {
        if (isvalid==true)
        {
              require(msg.value == amount);
              //msg.sender.transfer(amount);
              deposits[msg.sender] += msg.value;
              return  true;

         }
         return false;

    }
    */

    function sendBal(address payable receiver) public payable onlyPatient returns (bool){
        if (isvalid==true)
        {
            uint256 amount = msg.value;
            for(uint256 i = 0; i < pharmacists_list.length - 1; i++)
               {
                if(pharmacists_list[i].Pharm == receiver){
                receiver.transfer(amount);
                deposits[msg.sender] += amount;
                return true;
               }
               }
            
      }
      return false;
         
}
    
}