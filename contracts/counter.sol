//SPDX-License-Identifier: UNLICENSED
pragma solidity  >=0.5.0 <0.9.0;

// imagine a big integer counter that the whole world could share contract

contract counter{
    uint value; 

function initialize () public { 
 value = 0; } 

function get() view public returns (uint) { 
return value; } 

function increment () public { 
value+=1; // return (optional) 
} 

function decrement () public { 
 value-=1; 
} 
} 
