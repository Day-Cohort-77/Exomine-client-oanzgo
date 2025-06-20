import {
  setFacility,
  setMineral,
  getSelectedFacility,
} from "./TransientState.js";

const chooseFacility = async (event) => {
  if (event.target.id === "facility") {
    const chosenFacility = parseInt(event.target.value);
    setFacility(chosenFacility);
  }
};

//this function should display radio buttons only when our facility choice is non-zero
//only display the minerals for that certain facility

const chooseMineral = async (event) => {
  //check if transient state is non zero
  const selectedFacility = getSelectedFacility();
  // if there is no selection, return an empty string
  if (selectedFacility === 0) {
    return "";
  }
  //retrieve our join table of facility mineral that are specific to the chosen facility
  const facilityMineralResponse = await fetch(
    `http://localhost:8088/facilityMinerals?facilityId=${selectedFacility}`
  );
  const facilityInventory = await facilityMineralResponse.json(); //this returns an array of objects from our database
  const mineralResponse = await fetch("http://localhost:8088/minerals");
  const minerals = await mineralResponse.json();
  //use the map array method to generate a radio button for each mineral at that facility
  const facilityMineralRadioButtons = facilityInventory.map(
    (facilityMineral) => {
      //retrieve the name and quantity of the mineral for the facility
      const foundMineral = minerals.find((mineral) => {
        return facilityMineral.mineralId === mineral.Id;
      });
      return `<input type="radio" name="facilityMinerals"/>${foundMineral.name} has ${facilityMineral.quantity} tons available`;
    }
  );
  //make sure we use .join to combine & return our html
  return facilityMineralRadioButtons.join("");
};

export const facilityOptions = async () => {
  const response = await fetch("http://localhost:8088/facilities");
  const facilities = await response.json();

  document.addEventListener("change", chooseFacility);

  let facilityOptionsHTML = "<h2>Facility Options</h2>";
  facilityOptionsHTML += '<select id="facility">';
  facilityOptionsHTML += '<option value="0">Select a Facility</option>';

  const facilityArray = facilities.map((facility) => {
    if (facility.status === "active") {
      return `<option value ="${facility.id}">${facility.name}</option>`;
    }
  });
  facilityOptionsHTML += facilityArray.join("");
  facilityOptionsHTML += "</select>";

  return facilityOptionsHTML;
};
