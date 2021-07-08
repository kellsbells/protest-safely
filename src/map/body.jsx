import React from 'react';

const Body = () => {
    return(
        <>
        <div class="container text-center">
        <div id="geolocation-header">
            <div class="button-container">
                <button id="geolocation-button" disabled class="btn btn-success">Find My Location</button>
                <button id="geolocation-decline">X</button>
            </div>
        </div>
        <div id="map"></div>
        <div id="actions-footer">
            <button id="actions-add">Add</button>
        </div>
        <div id="add-modal" class="hide">
            <div class="add-initial hide">
                <div id="add-protest" class="add-item">
                    <div class="add-icon">
                        <img src="./images/protest.png" alt="Protest Icon" />
                    </div>
                    <div class="add-copy">
                        <h3>Protest</h3>
                        <p>Add a protest at your current location</p>
                    </div>
                </div>
                <div id="add-police" class="add-item">
                    <div class="add-icon">
                        <img src="./images/police.png" alt="Police Icon" />
                    </div>
                    <div class="add-copy">
                        <h3>Police</h3>
                        <p>Add police at your current location</p>
                    </div>
                </div>
                <div id="add-aid" class="add-item">
                    <div class="add-icon">
                        <img src="./images/aid.png" alt="Aid Icon" />
                    </div>
                    <div class="add-copy">
                        <h3>Aid Station</h3>
                        <p>Add an aid station at your current location</p>
                    </div>
                </div>
            </div>
            <div class="add-protest-form hide form">
                <p>Current Level of Protest Activity</p>
                <form onsubmit="submitProtestEvent(event);">
                    <input type="radio" id="peaceful" name="demolevel" value="peaceful" />
                    <label for="peaceful">Peaceful</label><br />
                    <input type="radio" id="intensifying" name="demolevel" value="intensifying" />
                    <label for="intensifying">Intensifying</label><br />
                    <input type="radio" id="dangerous" name="demolevel" value="dangerous" />
                    <label for="dangerous">Dangerous</label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div class="add-police-form hide form">
                <p>Current Level of Police Activity</p>
                <form onsubmit="submitPoliceEvent(event);">
                    <input type="radio" id="peaceful" name="policelevel" value="peaceful" />
                    <label for="peaceful">Peaceful</label><br/>
                    <input type="radio" id="intensifying" name="policelevel" value="intensifying" />
                    <label for="intensifying">Intensifying</label><br/>
                    <input type="radio" id="dangerous" name="policelevel" value="dangerous" />
                    <label for="dangerous">Dangerous</label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="aid-form" class="add-aid-form hide form">
                <p>Available at this aid station</p>
                <form onsubmit="submitAidEvent(event);">
                    <input type="checkbox" name="water" value="water" />
                    <label for="water">Water</label><br/>
                    <input type="checkbox" name="food" value="food" />
                    <label for="food">Food</label><br/>
                    <input type="checkbox" name="medical" value="medical" checked />
                    <label for="medical">Medical</label><br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
        </>
    );
};

export default Body;

