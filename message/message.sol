// Copyright (c) 2016 Peter Robinson
//
// This is a simple messaging system contract.
// It is split into a factory, interface, data, and implementation. This idea is that
// all of the complexity should be in the implementation, and it should be upgradable.
//
// The instantiation process should be:
//
// Create MsgEngineData, MsgV1, MsgFactory, then call MsgEngineData.setCurrator(MsgFactory)  MsgEngineData.setMsgImpl(MsgV1)
//
//
// TODO add events to have some logging.


// Extend this contract to have an "owned" contract.
contract owned {
  address public owner;
  function owned() {
    owner = msg.sender;
  }
  function changeOwner(address newOwner) onlyowner {
    owner = newOwner;
  }
  modifier onlyowner() {
    if (msg.sender!=owner) {throw;} _
  }
}

// Contracts extending this contract can't receive ether.
contract noether {
  // Throw an exception to roll-back the transaction if:
  // - the address.send method is called, to send ether to this account.
  // - a function is called which doesn't map to any function on the contract.
  function() {throw;}
}



// Factory contract from which the latest MsgEngineInterface implementation can be obtained.
contract MsgFactory is owned, noether {

  address public msgCurrentImpl;
  MsgEngineData public msgEngineData;

  // This holds a history of all previous implementations.
  address[] public previousImplementations = new address[](0);

  function MsgFactory(address _msgEngineData, address _newMsgImpl){
    msgEngineData = MsgEngineData(_msgEngineData);
    msgCurrentImpl = _newMsgImpl;
  }

  

  //TODO keep a track of old versions.
  // Upgrade from an old implementation to a new implementation.
  function upgrade(address _newMsgImpl) onlyowner {
    MsgEngineInterface tempNew = MsgEngineInterface(_newMsgImpl);
    MsgEngineInterface tempOld = MsgEngineInterface(msgCurrentImpl);
    
    // Make sure the version number is bigger for the new version.
    if (tempNew.getVersion() <= tempOld.getVersion()) {
      throw;
    }

    msgCurrentImpl = _newMsgImpl;
    msgEngineData.setMsgImplUpgrade(_newMsgImpl);
    previousImplementations.push(_newMsgImpl);
  }

  function getImplementation() constant returns (address) {
    return msgCurrentImpl;
  }

}




contract MsgEngineInterface is owned, noether {
  MsgEngineData public msgEngineData;


  function MsgEngineInterface(address _msgData){
     msgEngineData = MsgEngineData(_msgData);
  }
  function whoami() returns (address) {
    return (msg.sender);
  }


  // Returns the implementation version.
  function getVersion() constant returns (uint);


  function sendMessage(address _recipient, bytes _msg);
  function consumeNextMessage();

//  function getNextMessage() constant returns (address, uint, bytes);
  function getNextMessage(address _user) constant returns (address, uint, bytes);
  function getMessageFrom(address _user) constant returns (address);
  function getMessageMsg(address _user) constant returns (bytes);


  function isValidUser(address _user) constant returns (bool);
  function inboxIsEmpty(address _user) constant returns (bool);
  function inboxSize(address _user) constant returns (uint);

}



contract MsgEngineData is owned, noether {
  address public currator;
  address public msgImpl;
  address public userAdmin;
  
  struct Message {
    address to;
    address from;
    uint time;
    bytes32 message; // message piece.
    bytes32 prev; // Id of previous message.
    bytes32 next; // Id of next message.
    uint len;
  }
  
  struct Inbox {
    bytes32 first;           	// Index of first message;
    bytes32 last;		// Index of last message.
    uint size;
    string signedEncryptionKey;	// Signed encryption key.  //TODO can pass string as parameters but can not return strings.
    bool isValidUser;        // true if the user's inbox is set-up.

  }
  
  mapping(address => Inbox) public inboxes;
  mapping(bytes32 => Message) messages;
  
  
 
  
  modifier onlyCurrator() {
    if (msg.sender!=currator) {throw;} _
  }
  modifier onlyMsgImpl() {
    if (msg.sender!=msgImpl) {throw;} _
  }
  modifier onlyUserAdmin() {
    if (msg.sender!=userAdmin) {throw;} _
  }

  
  
  function MsgEngineData() {
    userAdmin = msg.sender;
  }
  
  function setCurrator(address _currator) onlyowner {
    currator = _currator;
  }
  
  function setUserAdmin(address _userAdmin) onlyowner {
    userAdmin = _userAdmin;
  }

  function setMsgImplFirstTime(address _msgImpl) onlyowner {
    msgImpl = _msgImpl;
  }
  function setMsgImplUpgrade(address _msgImpl) onlyCurrator {
    msgImpl = _msgImpl;
  }


  function addUser(address _newUser) onlyUserAdmin {
//  function addUser(address _newUser) {
//    if (!inboxes[_newUser].isValidUser) {
//      throw; // No return types work on non-constant functions.      return 1;
//    }
//    
    inboxes[_newUser].isValidUser = true;
  }


  function sendMsg(address _sender, address _recipient, bytes32 _message, uint _len) onlyMsgImpl {
    if (!isValidUserL(_sender)) {
      throw; // No return types work on non-constant functions.      return 1;
    }
    if (!isValidUserL(_recipient)) {
      throw; // No return types work on non-constant functions.      return 2;
    }

    // memory key word usage below, see: http://ethereum.stackexchange.com/questions/4467/initialising-structs-to-storage-variables
    Message memory m = Message({to: _recipient, from: _sender, time: block.timestamp, message: _message, prev:0, next:0, len:_len});
    bytes32 id = sha256(_recipient, msg.sender, _message, block.timestamp);
    messages[id] = m;
    
    
    Inbox inbox = inboxes[_recipient];
    if (inbox.last != 0) {
      messages[inbox.last].next = id;
      messages[id].prev = inbox.last;
    }
    inbox.last = id;
    if (inbox.first == 0) {
        inbox.first = id;
    }
    inbox.size = inbox.size + 1;
    // No return types work on non-constant functions.      return 0;
  }

    
  function getMsg(address _recipient) constant onlyMsgImpl returns (address, uint, bytes32, uint) {
//  function getMsg(address _recipient) constant onlyMsgImpl returns (address) {
    if (!isValidUserL(_recipient)) {
      throw; // No return types work on non-constant functions.      return (1, 0, 0, "");
    }
  
    Inbox inbox = inboxes[_recipient];
    if (inboxIsEmptyL(inbox)) {
      throw; // No return types work on non-constant functions.      return (2, 0, 0, "");
    }
    Message m = messages[inbox.first];
    return (m.from, m.time, m.message, m.len);
    
    
//        address msgFrom;
//            msgFrom = _recipient;
//    return (msgFrom);
  }
  
  function consumeMsg(address _recipient) onlyMsgImpl {
    if (!isValidUserL(_recipient)) {
      throw; 
    }
  
    Inbox inbox = inboxes[_recipient];
    if (inboxIsEmptyL(inbox)) {
      throw; // No return types work on non-constant functions.      return (2, 0, 0, "");
    }
    Message m = messages[inbox.first];
    delete messages[inbox.first];

    if (m.next != 0) {
      messages[m.next].prev=0;
      inbox.first = m.next;
    } else {
      inbox.first = 0;
      inbox.last = 0;
    }
    inbox.size = inbox.size - 1;
  }
  
  function isValidUser(address user) constant onlyMsgImpl returns (bool) {
    return isValidUserL(user);
  }
  
  function inboxIsEmpty(address _recipient) constant onlyMsgImpl returns (bool) {
    if (!isValidUserL(_recipient)) {
      throw; 
    }
  
    Inbox inbox = inboxes[_recipient];
    return inboxIsEmptyL(inbox);
  }

  function inboxSize(address _recipient) constant onlyMsgImpl returns (uint) {
    if (!isValidUserL(_recipient)) {
      throw; 
    }
  
    Inbox inbox = inboxes[_recipient];
    return inbox.size;
  }


  // Private functions with no onlyXXX protection.  
  
  function inboxIsEmptyL(Inbox inbox) constant private returns (bool) {
    return inbox.first == 0;
  }

  function isValidUserL(address user) constant private returns (bool) {
    return inboxes[user].isValidUser;
  }

  
}






contract MsgV1 is MsgEngineInterface {
  uint constant VER = 1;

  function MsgV1(address _msgData) MsgEngineInterface(_msgData){
  }

  
  function getVersion() constant returns (uint) {
    return VER;
  }



//  function sendMessage(address _recipient, string _msg) returns (uint) {

// TODO accept a string and convert to byte arrays

  function sendMessage(address _recipient, bytes _msg) {
      uint len = _msg.length;
      if (len > 32) {
          throw;
      }
      
      bytes32 aFixedSizeMsg;
      for (uint i = 0; i < len; i++) {
          aFixedSizeMsg = aFixedSizeMsg | bytes32(uint(_msg[i]) * 2** (8*i));
      }
      
      msgEngineData.sendMsg(msg.sender, _recipient, aFixedSizeMsg, len);
  }
  

// TODO return  a string and convert from byte arrays
//  function getMessage() returns (uint, address, uint, string) {
  function getNextMessage(address _user) constant returns (address, uint, bytes) {
    address msgFrom;
    uint msgTime;
    bytes32 message;
    uint len;
    (msgFrom, msgTime, message, len) = msgEngineData.getMsg(_user);

    //(msgFrom) = msgEngineData.getMsg(_user);
    
    //    message = 0x1234;
    //    len = 32;
        //msgFrom = msg.sender;
    //    msgTime = block.timestamp;

    
    // TODO fix this. Endian problem! ???
    len = 32;
    
    bytes memory messageBytes = new bytes(len);
    for (uint i = 0; i < len; i++) {
      messageBytes[i] = message[i];
    }
    return (msgFrom, msgTime, messageBytes);
  }
  

  function getMessageFrom(address _user) constant returns (address) {
    address msgFrom;
    uint msgTime;
    bytes memory message;
    (msgFrom, msgTime, message) = getNextMessage(_user);
    return msgFrom;
  }

  function getMessageMsg(address _user) constant returns (bytes) {
    address msgFrom;
    uint msgTime;
    bytes memory message;
    (msgFrom, msgTime, message) = getNextMessage(_user);
    return message;
  }



  function consumeNextMessage() {
    msgEngineData.consumeMsg(msg.sender);
  }


  function isValidUser(address _user) constant returns (bool) {
    return msgEngineData.isValidUser(_user);
  }
  
  function inboxIsEmpty(address _user) constant returns (bool) {
    return msgEngineData.inboxIsEmpty(_user);
  }

  function inboxSize(address _user) constant returns (uint) {
    return msgEngineData.inboxSize(_user);
  }

}
