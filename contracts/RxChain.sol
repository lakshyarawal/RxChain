// SPDX-License-Identifier: GPL-3.0
//pragma experimental ABIEncoderV2;
pragma solidity  >=0.5.0 <0.9.0;

contract RxChain{
    
    address Doc;
    address payable Pharm;
    address payable Pat;

    //uint256 PresID;
    uint256 PresID=0;

    //to check if the prescription is valid
    
  
    struct PresDetails{
           string PresDate;
           address payable Pat;
           address Doc;
           string medicines;}

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

    struct Pharmacy{

    string name;
    string email;
    //store address
    string store_address;
    address payable Pharm;
    }
    mapping(uint256=>PresDetails) public prescription;
    mapping (address=>bool) public patient_membership;
    mapping (address=>bool) public pharmacy_membership;
    //doctors address mapped to the whether they exist or not
    mapping(address => bool) public genuine_doctors;
    
    mapping (uint256 => address) public pres_pat_mapping;
    
    uint256[] public total_pres;
    uint256[] public pres;

    mapping(address=>bool) public prescription_membership;
    //deposits mapping
    mapping (address=>uint256) public deposits;
     
  
    modifier onlyDoctor{
             require(msg.sender == Doc);
             _;
    }
    modifier onlyPatient{
             require(payable(msg.sender) == Pat);
             _;
    }
    modifier onlypharmacy{
           require(payable(msg.sender) == Pharm);
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

   event Doctor_Register_status(
   address doc_new,string _name, uint256 age,string _email,string _clinic_name, bool status
   );
    event Patient_Register_status(
    address payable pat_new,string _name, uint256 age,string _email,bool status
   );
   event Pharmacy_Register_status(
   address payable pharm_new,string _name, string _email,string _store_address, bool status
   );
   event Doctor_Unregister_status(
   address doc_new,bool status
   );
    event Patient_Unregister_status(
    address payable pat_new,bool status
   );
   event Pharmacy_Unregister_status(
   address payable pharm_new,bool status
   );
   event Prescription_Register_status(
    address payable _Pat, address _Doc, string _PresDate,string medicines,bool status
   );
   event Validation_status(
    address payable _pat, address _doc, uint pres_id,bool status
   );
   event add_Funds(
    address _pat,uint256 amount,bool status
   );
   event settlepayment_status(
    address _sender,address _receiver,uint256 amount,bool status
   );

  constructor() {
    Doc = msg.sender;
    Pat = payable(msg.sender);
    Pharm = payable(msg.sender);

  }

   //Registering the new Doctor
    function Doctor_Register(address doc_new,string memory _name, uint256 age,string memory _email,string memory _clinic_name) public   
    onlyDoctor DoctorListed(doc_new) returns (bool)
  {
    genuine_doctors[doc_new]=true;
    emit Doctor_Register_status(doc_new,_name,age,_email,_clinic_name,true);
    return true;
  }
    //De-Registering the Doctor
   function Doctor_Unregister(address doc_new) public onlyDoctor    
    DoctorAlreadyListed(doc_new) returns(bool) 
  {
    
    genuine_doctors[doc_new]=false;
    emit Doctor_Unregister_status(doc_new,true);
    return true;
  }
  //Registering the new Patient
   function Patient_Register(address payable pat_new,string memory _name, uint256 age,string memory _email) public onlyPatient   
     returns(bool) 
  {
     
    //patients_list.push(Patient({name:_name, age:age,email:_email,Pat:pat_new}));
    patient_membership[pat_new]=true;
    emit Patient_Register_status(pat_new,_name,age,_email,true);
    return true;
  }

  //Unregistering the new Patient
   function Patient_Unregister(address payable pat_new) public onlyPatient   
     returns(bool) 
  {
    //deleting from mapping
    patient_membership[pat_new]=false;
    emit Patient_Unregister_status(pat_new,true);
   
    return true;
  }
  //Registering a pharmacist
  function Pharmacy_Register(address payable pharm_new,string memory _name, string memory _email,string memory _store_address) public   
  onlypharmacy returns(bool) 
  {
      
    
    pharmacy_membership[pharm_new]=true;
    emit Pharmacy_Register_status(pharm_new,_name,_email, _store_address,true);
    return true;
  }
 //Unregistering the pharmacist

    function Pharmacy_Unregister(address payable pharm_new) public   
    onlypharmacy returns(bool) 
  {
    
    //deleting from mapping
    pharmacy_membership[pharm_new]=false;
    emit Pharmacy_Unregister_status(pharm_new,true);
    return true;
  }
  //adding prescription
  function Prescription_Register(address payable _Pat, address _Doc, string memory _PresDate,string memory medicines) public   
    onlyDoctor returns(bool) 
  {
     

    //prescription_list.push(PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines}));
    prescription[PresID]=PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines});
    pres_pat_mapping[PresID]=_Pat;
    total_pres.push(PresID);
    //prescription_membership[_Doc]=true;
    PresID+=1;
    emit Prescription_Register_status(_Pat,_Doc,_PresDate,medicines,true);
    return true;
  }

    //validating the prescription
    function validate_prescription(address payable _pat, address _doc) public onlypharmacy returns (bool) {
        bool isvalid=false;
        if(patient_membership[_pat]==true && genuine_doctors[_doc]==true)
        {
            for(uint256 i=0 ; i<total_pres.length;i++)
            {
                if (keccak256(abi.encodePacked(pres_pat_mapping[i])) == keccak256(abi.encodePacked(_pat)))
                {
                    pres.push(i);
                    isvalid=true;
                    emit Validation_status(_pat,_doc,i,true);
                }
            }
           
            
            if(isvalid==true)
            {
              
                return (true);
            }
            else
            {   
                emit Validation_status(_pat,_doc,0,false);
                return (false);
            }
        }
        else
        {
            emit Validation_status(_pat,_doc,0,false);
            return (false);
        }
    
    }

    function addFunds(uint256 amount) public onlyPatient payable returns (bool,uint256)
    {
      emit add_Funds(msg.sender,amount,true);
      deposits[msg.sender] += amount;
      return (true,amount);
    }

    function settlepayment(address payable receiver,uint256 amount) public onlyPatient payable returns (bool,uint256)
    {
        
           require(deposits[msg.sender] >= amount, "Insufficient funds");
            //uint256 amount = msg.value;
           if(pharmacy_membership[receiver]==true)
           {
                receiver.transfer(amount);
                deposits[msg.sender] -= amount;
                deposits[receiver] += amount;
                emit settlepayment_status(msg.sender,receiver,amount,true);
                return (true,amount);
            }
               
      emit settlepayment_status(msg.sender,receiver,amount,false);
      return (false,amount);
         
      }

}