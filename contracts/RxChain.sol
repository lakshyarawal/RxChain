// SPDX-License-Identifier: GPL-3.0
//pragma experimental ABIEncoderV2;
pragma solidity  >=0.5.0 <0.9.0;

contract RxChain{
    
    address payable Doc;
    address Doc;
    address payable Pharm;
    address payable Pat;

    //uint256 PresID;
    uint256 PresID=0;

    //to check if the prescription is valid
    
  
    struct PresDetails{
           string PresDate;
           address payable Pat;
           address payable Doc;
           string medicines;}
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
    address payable Doc;}

    struct Pharmacy{

    address Doc;}

    struct Pharmacy{

    uint256 age;
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
     mapping(uint256=>PresDetails) public prescription;
    mapping (address=>Patient) public patient_membership;
    mapping (address=>Doctor) public doctor_membership;
    mapping (address=>Pharmacy) public pharmacy_membership;
    
    //doctors address mapped to the whether they exist or not
    mapping(address => bool) public genuine_doctors;
    
    //doctors_list 
    Doctor[] public doctors_list;

    //patients_list to add_new_patients
    Patient[] public patients_list;

    //pharmacy_list to add_new_pharmacy
    Pharmacy[] public pharmacy_list;

     //prescription_list 
    PresDetails[] public prescription_list;

    mapping(address=>bool) public prescription_membership;
    //deposits mapping
    mapping (address=>uint256) public deposits;
     
  
    modifier onlyDoctor{
             require(payable(msg.sender) == Doc);
             _;
    }
    modifier onlyPatient{
             require(payable(msg.sender) == Pat);
             _;
    }
    modifier onlypharmacy{
           require(payable(msg.sender) == Pharm);
           require(msg.sender==Pharm);
             _;
    }
    modifier DoctorListed(address payable _doc) {
    require(genuine_doctors[_doc] == false,"Doctor is not there");
    _;
    }
     modifier DoctorAlreadyListed(address payable _doc) {
    require(genuine_doctors[_doc] == true,"Doctor is there");
    _;
    }

   event Doctor_Register_status(
   address payable doc_new,string _name, uint256 age,string _email,string _clinic_name, bool status
   address doc_new,string _name, uint256 age,string _email,string _clinic_name, bool status
   );
    event Patient_Register_status(
    address payable pat_new,string _name, uint256 age,string _email,bool status
   );
   event Pharmacy_Register_status(
   address payable pharm_new,string _name, string _email,string _store_address, bool status
   );
   event Doctor_Unregister_status(
   address payable doc_new,bool status
   address payable pharm_new,string _name, uint256 age,string _email,string _store_address, bool status
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
    address payable _Pat, address _Doc, string _PresDate,string[] medicines,bool status
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
    Doc = payable(msg.sender);
    Pat = payable(msg.sender);
    Pharm = payable(msg.sender);

  }

   //Registering the new Doctor
    function Doctor_Register(address payable doc_new,string memory _name, uint256 age,string memory _email,string memory _clinic_name) public   
    onlyDoctor DoctorListed(doc_new) returns (bool)
  {
    genuine_doctors[doc_new]=true;
    emit Doctor_Register_status(doc_new,_name,age,_email,_clinic_name,true);
    return true;
  }
    //De-Registering the Doctor
   function Doctor_Unregister(address payable doc_new) onlyDoctor public   
  

   //Registering the new Doctor
    function Doctor_Register(address doc_new,string memory _name, uint256 age,string memory _email,string memory _clinic_name) public   
    DoctorListed(doc_new) returns(bool) 
  {
     
    doctors_list.push(Doctor({name:_name, age:age,email:_email,clinic_name:_clinic_name,Doc:doc_new}));
    doctor_membership[doc_new]=Doctor({name:_name, age:age,email:_email,clinic_name:_clinic_name,Doc:doc_new});
    genuine_doctors[doc_new]=true;
    emit Doctor_Register_status(doc_new,_name,age,_email,_clinic_name,true);
      
    return true;
  }
    //De-Registering the Doctor
   function Doctor_Unregister(address doc_new) onlyDoctor public   
    DoctorAlreadyListed(doc_new) returns(bool) 
  {
    
    //delete doctor_membership[doc_new];
    genuine_doctors[doc_new]=false;
    emit Doctor_Unregister_status(doc_new,true);
    return true;
  }
  //Registering the new Patient
   function Patient_Register(address payable pat_new,string memory _name, uint256 age,string memory _email) onlyPatient public   
     returns(bool) 
  {
     
    //patients_list.push(Patient({name:_name, age:age,email:_email,Pat:pat_new}));
    patient_membership[pat_new]=true;
   function Patient_Register(address payable pat_new,string memory _name, uint256 age,string memory _email) public   
     returns(bool) 
  {
     
    patients_list.push(Patient({name:_name, age:age,email:_email,Pat:pat_new}));
    patient_membership[pat_new]=Patient({name:_name,age:age,email:_email,Pat:pat_new});
    emit Patient_Register_status(pat_new,_name,age,_email,true);
    return true;
  }

  //Unregistering the new Patient
   function Patient_Unregister(address payable pat_new) onlyPatient public   
   function Patient_Unregister(address payable pat_new) public   
     returns(bool) 
  {
    //deleting from mapping
    patient_membership[pat_new]=false;
    delete patient_membership[pat_new];
    emit Patient_Unregister_status(pat_new,true);
   
    return true;
  }
  //Registering a pharmacist
  function Pharmacy_Register(address payable pharm_new,string memory _name, string memory _email,string memory _store_address) public   
  onlypharmacy returns(bool) 
  {
      
    
    pharmacy_membership[pharm_new]=true;
    emit Pharmacy_Register_status(pharm_new,_name,_email, _store_address,true);
  //Registering the new pharmacist
    function Pharmacy_Register(address payable pharm_new,string memory _name, uint256 age,string memory _email,string memory _store_address) public   
    onlypharmacy returns(bool) 
  {
      
    pharmacy_list.push(Pharmacy({name:_name, age:age,email:_email,store_address:_store_address,Pharm:pharm_new}));
    pharmacy_membership[pharm_new]=Pharmacy({name:_name, age:age,email:_email,store_address:_store_address,Pharm:pharm_new});
    emit Pharmacy_Register_status(pharm_new,_name,age,_email, _store_address,true);
    return true;
  }
 //Unregistering the pharmacist

    function Pharmacy_Unregister(address payable pharm_new) public   
    onlypharmacy returns(bool) 
  {
    
    //deleting from mapping
    pharmacy_membership[pharm_new]=false;
     //deleting from array
     for(uint256 i = 0; i < pharmacy_list.length - 1; i++){
        if(pharmacy_list[i].Pharm == pharm_new){
          pharmacy_list[i] = pharmacy_list[i+1];
        }
      }
    //deleting from mapping
    delete pharmacy_membership[pharm_new];
    emit Pharmacy_Unregister_status(pharm_new,true);
    return true;
  }
  //adding prescription
  function Prescription_Register(address payable _Pat, address payable _Doc, string memory _PresDate,string memory medicines) public   
    onlyDoctor returns(bool) 
  {
     

    //prescription_list.push(PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines}));
    prescription[PresID]=PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines});
    pres_pat_mapping[PresID]=_Pat;
    total_pres.push(PresID);
    //prescription_membership[_Doc]=true;
    PresID+=1;
    prescription_list.push(PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines}));
    prescription[PresID.get()]=PresDetails({PresDate:_PresDate,Pat:_Pat,Doc:_Doc,medicines:medicines});
    PresID.increment();
    emit Prescription_Register_status(_Pat,_Doc,_PresDate,medicines,true);
    return true;
  }




    //validating the prescription
    function validate_prescription(address payable _pat, address payable _doc) public onlypharmacy returns (bool,uint256[] memory) {
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
               
                return (true,pres);
            }
            else
            {   uint256[] memory temp;
                pres=temp;
                emit Validation_status(_pat,_doc,0,false);
                return (false,pres);
            }
        }
        else
        {
            emit Validation_status(_pat,_doc,0,false);
            return (false,pres);
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
    function validate_prescription(address payable _pat, address _doc, uint pres_id) public onlypharmacy returns (bool) {

        if(keccak256(abi.encodePacked(patient_membership[_pat].Pat))==keccak256(abi.encodePacked((prescription[pres_id].Pat))))
        {
                 if(keccak256(abi.encodePacked(doctor_membership[_doc].Doc))==keccak256(abi.encodePacked( prescription[pres_id].Doc)))
                 
                {isvalid=true;
                emit Validation_status(_pat,_doc,pres_id,true);
                return true;}
                
           
        }
        emit Validation_status(_pat,_doc,pres_id,false);
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
    function addFunds() public payable onlyPatient returns (bool)
    {
      emit add_Funds(msg.sender,msg.value,true);
      deposits[msg.sender] += msg.value;
      return true;
    }

    function settlepayment(address payable receiver,uint256 amount) public payable onlyPatient returns (bool){
        if (isvalid==true)
        {
           require(deposits[msg.sender] >= amount, "Insufficient funds");
            //uint256 amount = msg.value;
            for(uint256 i = 0; i < pharmacy_list.length - 1; i++)
               {
                if(pharmacy_list[i].Pharm == receiver){
                receiver.transfer(amount);
                deposits[msg.sender] -= amount;
                deposits[receiver] += amount;
                emit settlepayment_status(msg.sender,receiver,amount,true);
                return true;
               }
               }
            
      }
      emit settlepayment_status(msg.sender,receiver,amount,false);
      return false;
         
}
}
