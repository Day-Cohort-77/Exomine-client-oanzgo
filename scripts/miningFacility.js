import {
  setFacility,
  setMineral,
  getSelectedFacility,
} from "./TransientState.js";

const chooseFacility = async (event) => { ///this asynchronous function will be invoked when the user selects a facility from the dropdown 
 //////////////////////////"event" is the parameter that will be passed in when the event listener is invoked///
  //check if the event target is the facility dropdown//
  if (event.target.id === "facility") {//this if statement checks to see if the event target is the facility dropdown
    //if it is, we will set the facility in our transient state to the value of the selected option
    const chosenFacility = parseInt(event.target.value);//this line retrieves the value of the selected option and converts it to an integer
    setFacility(chosenFacility);//this function sets the facility in our transient state to the chosen facility
  
  }
};

//this function should display radio buttons only when our facility choice is non-zero
//only display the minerals for that certain facility

export const chooseMineral = async (event) => {//this asynchronous function will be invoked when the user selects a facility from the dropdown
  //check if transient state is non zero
  const selectedFacility = getSelectedFacility();//this function retrieves the selected facility from our transient state
  //if the selected facility is zero, we will not display any minerals
  // if there is no selection, return an empty string
  if (selectedFacility === 0) {//this if statement checks to see if the selected facility is zero
    return "";//if it is, we will return an empty string
  }
  //retrieve our join table of facility mineral that are specific to the chosen facility
  const facilityMineralResponse = await fetch(//this fetch request will retrieve minerals for the selected facility
    `http://localhost:8088/facilityMinerals?facilityId=${selectedFacility}`//this line uses .json location and sends GET request to retrieve the mineral "state" for the selected facility
  );
  const facilityInventory = await facilityMineralResponse.json(); //this line parses the response to json format
  const mineralResponse = await fetch("http://localhost:8088/minerals");//this is GET request that retrieves all available minerals from the UI selected facility
  const minerals = await mineralResponse.json();//this line parses the minerals from selected facility to json format
  //use the map array method to generate a radio button for each mineral at that facility
  const facilityMineralRadioButtons = facilityInventory.map(//this line uses the .map() method to iterate over each facility mineral in the facilityInventory array
    (facilityMineral) => {//this function takes each facility mineral available at UI selected facility and returns a radio button for it
      //retrieve the name and quantity of the mineral for the facility
      const foundMineral = minerals.find((mineral) => {//this line uses the .find() method to search for the mineral in the minerals array that matches the UI selected facility mineral's mineralId
        //this function checks if the mineralId of the "facility mineral" matches the id of the mineral from the minerals array
        //if it does, it returns the mineral object
        //if it does not, it returns undefined
        //this is how we get the mineral name and quantity for the radio button
        return facilityMineral.mineralId === mineral.id;// this line checks if the mineralId of the facility mineral matches the integer id of the mineral from the minerals array
      });
      return `<input type="radio" name="facilityMinerals"/>${foundMineral.name} has ${facilityMineral.quantity} tons available`;
      // this line returns a string that contains the HTML for a radio button input element with the name 
      // "facilityMinerals" and the value of the mineral name and quantity available at the selected facility
    }
  );
  //make sure we use .join to combine & return our html
  return facilityMineralRadioButtons.join("");
  //this line uses the .join() method to combine the array of radio buttons into a single string of HTML
};

export const facilityOptions = async () => {
  //this asynchronous function will be invoked to retrieve the facilities from the API and display them in a dropdown menu
  const response = await fetch("http://localhost:8088/facilities");//this line uses the fetch API to generate a GET request for the facilities array from the API
  const facilities = await response.json();//this line parses the response to json format
  //this line retrieves the selected facility from our transient state
  //this will be used to determine which facility is currently selected in the dropdown menu
  const selectedFacility = getSelectedFacility()//this line retrieves the selected facility from our transient state;
  document.addEventListener("change", chooseFacility);
  //this line adds an event listener to the document that listens for a change event and invokes 
  // the chooseFacility function when the event occurs

  let facilityOptionsHTML = "<h2>Facility Options</h2>";//this line initializes a variable to hold the HTML for the facility options dropdown menu
  facilityOptionsHTML += '<select id="facility">';//this line adds a select element to the HTML string with an id of "facility"
  facilityOptionsHTML += '<option value="0">Select a Facility</option>';//this line adds an option element to the HTML string with a value of 0 and text "Select a Facility"

  const facilityArray = facilities.map((facility) => {//this line uses the .map() method to iterate over each facility in the facilities array
    //this function takes each facility and returns an option element for it
   
    
    if (facility.is_active) {//this if statement checks if the facility is active
      //if it is, we will return an option element with the facility id and name
      return `<option ${selectedFacility !== 0 ? "selected" : ""} value ="${facility.id}">${facility.facilityName}</option>`;//
    }//if the facility is not active, we will not return an option element for it
  });
  facilityOptionsHTML += facilityArray.join("");
  //this line uses the .join() method to combine the array of option elements into a single string of HTML
  facilityOptionsHTML += "</select>";//this line adds a closing select tag to the HTML string

  return facilityOptionsHTML;//this line returns the HTML string for the facility options dropdown menu
};
