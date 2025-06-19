export const facilityOptions = async () => {
    const response = await fetch("http://localhost:8088/mining_facilities")
    const facilities = await response.json()

    let facilityOptionsHTML = "<h2>Facility Options</h2>"
    facilityOptionsHTML += '<select id="facility">'
    facilityOptionsHTML += '<option value="0">Select a Facility</option>'

    const facilityArray = facilities.map(
        (facility) => {
            if (facility.status === "active") {
                return `<option value ="${facility.id}">${facility.name}</option>`
            }
        }
    )
    facilityOptionsHTML += facilityArray.join("")
    facilityOptionsHTML += "</select>"

    return facilityOptionsHTML
}