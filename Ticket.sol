// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Ticket {
    struct EventInfo {
        uint id;
        uint ticketCount;
        uint price;
        bytes32 date;
        bytes32 name;
        bytes32 city;
        bytes10 category;
        bytes8 time;
        bytes location;
        bytes description;
        bool isActive;
    }
    
    address[] public owners;
    EventInfo[] public events;
    mapping(address => bool) public isOwner;
    mapping(uint => EventInfo) public findEvent;
    mapping(address => uint[]) public userEvents;
    
    event createEvent(address indexed owner, uint indexed id, uint _ticketCount, uint _price, bytes32 _date, bytes32 _name, bytes _location, bytes32 _city, bytes _description, bytes10 _category, bool _isActive);
    event deleteEvent(address indexed owner, uint indexed id);
    event editEvent(address indexed owner, uint indexed id);
    event buyTicket(address indexed sender, uint indexed id, bytes24 time);
    event withdraw(address indexed _from, address indexed _to);
    event addOwner(address indexed sender, address indexed newOwner);
    event deleteOwner(address indexed sender, address indexed deletedAddress);
    
    constructor(address[] memory _owners) {
        for(uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner exists already");
            
            isOwner[owner] = true;
            owners.push(owner);
        }
    }
    
    modifier onlyOwner() {
        require(isOwner[msg.sender], "You are not owner!");
        _;
    }

    function GetOwners() external view onlyOwner returns(address[] memory)  {
        return owners;
    }

    function GetUserEvents(address _address) external view returns(uint[] memory) {
        return userEvents[_address];
    }
    
    function CreateEvent(uint _ticketCount, uint _price, bytes32 _date, bytes32 _name, bytes memory _location, bytes32 _city, bytes memory _description, bytes10 _category, bytes8 _time, bool _isActive) external onlyOwner {
        uint id = events.length + 1;
        EventInfo memory _event = EventInfo(id, _ticketCount, _price, _date, _name, _city, _category, _time, _location, _description, _isActive);
        findEvent[id] = _event;
        events.push(_event);
        emit createEvent(msg.sender, id, _ticketCount, _price, _date, _name, _location, _city, _description, _category, _isActive);
    }
    
    function GetEvent(uint id) public view returns(uint, uint, uint, bytes32, bytes32, bytes32, bytes10, bytes8, bytes memory, bytes memory, bool) {
        EventInfo memory _event = findEvent[id]; 
        return (_event.id, _event.ticketCount, _event.price, _event.date, _event.name,  _event.city, _event.category, _event.time, _event.location, _event.description, _event.isActive);
    }

    function GetEvents() external view returns(EventInfo[] memory) {
        return events;
    }
    
    function DeleteEvent(uint id) public onlyOwner{
        require(findEvent[id].isActive, "Event is deleted already!");
        findEvent[id].isActive = false;
        emit deleteEvent(msg.sender, id);
    }
    
    function EditEvent(uint id, uint _ticketCount, uint _price, bytes32 _date, bytes32 _name, bytes memory _location, bytes32 _city, bytes memory _description, bytes10 _category, bytes8 _time, bool _isActive) external onlyOwner {
        findEvent[id].ticketCount = _ticketCount;
        findEvent[id].price = _price;
        findEvent[id].date = _date;
        findEvent[id].name = _name;
        findEvent[id].location = _location;
        findEvent[id].city = _city;
        findEvent[id].description = _description;
        findEvent[id].category = _category;
        findEvent[id].time = _time;
        findEvent[id].isActive = _isActive;
        events[id - 1].ticketCount = _ticketCount;
        events[id - 1].price = _price;
        events[id - 1].date = _date;
        events[id - 1].name = _name;
        events[id - 1].location = _location;
        events[id - 1].city = _city;
        events[id - 1].description = _description;
        events[id - 1].category = _category;
        events[id - 1].time = _time;
        events[id - 1].isActive = _isActive;
        emit editEvent(msg.sender, id);
    }
    
    function BuyTicket(uint id, bytes24 time) external payable {
        require(findEvent[id].ticketCount > 0, "All tickets sold!");
        require(findEvent[id].price <= msg.value, "Please check ticket price!");
        userEvents[msg.sender].push(id);
        findEvent[id].ticketCount--;
        events[id - 1].ticketCount--;
        if (findEvent[id].ticketCount <= 0) {
            findEvent[id].isActive = false;
        }
        emit buyTicket(msg.sender, id, time);
    }
    
    function Withdraw(address payable _to) public onlyOwner {
        uint balance = address(this).balance;
        _to.transfer(balance);
        emit withdraw(msg.sender, _to);
    }
    
    function AddOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "invalid owner");
        require(!isOwner[_newOwner], "owner exists already");
        isOwner[_newOwner] = true;
        owners.push(_newOwner);
        emit addOwner(msg.sender, _newOwner);
    }
    
    function DeleteOwner(address _owner, uint index) external onlyOwner {
        require(_owner != address(0), "invalid owner");
        require(isOwner[_owner], "owner not exists!");
        isOwner[_owner] = false;
        owners[index] = owners[owners.length - 1];
        owners.pop();
        emit deleteOwner(msg.sender, _owner);
    }

    function IsOwner(address _address) external view returns(bool) {
        return isOwner[_address];
    }
}
