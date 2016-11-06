var claims_counter;

//Starts Chain reaction of posting data to the server
function form_data(number_of_claims){
    
    ////GET PERSONAL DETAILS
    //****START****//
    var persontitle = document.forms["person_details_form"]["persontitle"].value;
    var personforename = document.forms["person_details_form"]["personforename"].value;
    var personsurname = document.forms["person_details_form"]["personsurname"].value;
    var personemail = document.forms["person_details_form"]["personemail"].value;
    var persondob = document.forms["person_details_form"]["persondob"].value;
    var personphonenumber = document.forms["person_details_form"]["personphonenumber"].value;
    var personaddress1 = document.forms["person_details_form"]["personaddress1"].value;
    var personaddress2 = document.forms["person_details_form"]["personaddress2"].value;
    var personaddress3 = document.forms["person_details_form"]["personaddress3"].value;
    var personpostcode = document.forms["person_details_form"]["personpostcode"].value;
    //radio buttons checked
    var personlicensetype
    if (document.getElementById("personlicensetypefull").checked){
        personlicensetype = "Full";
    }
    else{
        personlicensetype = "Provisional";
    }    
    var personlicenseperiod = document.forms["person_details_form"]["personlicenseperiod"].value;
    var personoccupation = document.forms["person_details_form"]["personoccupation"].value;
    var personnumberofclaims = document.forms["person_details_form"]["personnumberofclaims"].value;
    //****END****//
    
    ////CREATE JSON AND SEND
    //****START****//
    var json_string = {
        "title":    persontitle.toUpperCase(),
        "forename": personforename.toUpperCase(),
        "surname":  personsurname.toUpperCase(),
        "email":    personemail.toUpperCase(),
        "dob":      persondob,
        "phone_number": personphonenumber,
        "address1": personaddress1.toUpperCase(),
        "address2": personaddress2.toUpperCase(),
        "address3": personaddress3.toUpperCase(),
        "postcode": personpostcode.toUpperCase(),
        "license_type": personlicensetype.toUpperCase(),
        "license_period":   personlicenseperiod,
        "occupation":   personoccupation.toUpperCase(),
        "number_of_claims": personnumberofclaims
    };
    console.log("posting person");
    post_person(json_string, number_of_claims);   
    //****END****//

}


function post_person(person_string, number_of_claims){
    $.ajax({
        type: "POST",
        url: 'https://localhost:3000/people.json',
        dataType: 'application/json',
        data: {person: person_string},
        complete: function(data){
            var str = data.responseText;
            if(str == '{"email":["has already been taken"]}'){
                alert("Email is already taken");
            }
            else{
                var obj = JSON.parse(str);
                var person_id = obj.id;
                $("#details_email_address").append("Your email address is: "+obj.email);
                $("#details_unique_string").append("Your unique retrieval string is: "+obj.unique_string);
                do_claims(person_id, number_of_claims); 
            }           
        }
    });
}


function do_claims(person_id, number_of_claims){
    //alert(person_id);
    var claims_details_array = new Array();
    claims_details_array = get_claims_details(claims_details_array, number_of_claims);
    claims_counter = 0;
    post_claims_details(claims_details_array, person_id);
    
}

function get_claims_details(claims_details_array, number_of_claims){
    for (var i=0; i<number_of_claims; i++){
        claims_details_array[i] = "";
        claims_details_array[i] = claims_details_array[i] + document.forms["claim_"+(i+1)+"_form"]["claimdate"+(i+1)].value;
        claims_details_array[i] = claims_details_array[i] + "->";
        claims_details_array[i] = claims_details_array[i] + document.forms["claim_"+(i+1)+"_form"]["claimvalue"+(i+1)].value;
        claims_details_array[i] = claims_details_array[i] + "->";
        claims_details_array[i] = claims_details_array[i] + document.forms["claim_"+(i+1)+"_form"]["claimtype"+(i+1)].value.toUpperCase();
        claims_details_array[i] = claims_details_array[i] + "->";
        claims_details_array[i] = claims_details_array[i] + document.forms["claim_"+(i+1)+"_form"]["claimdescription"+(i+1)].value.toUpperCase();
        //alert(claims_details_array[i]);
    }
    return claims_details_array;
}


function post_claims_details(claims_details_array, person_id){
    var json_string;
    var claim_array;
    if(claims_counter < claims_details_array.length){
        //alert("starting claim "+claims_counter);
        claim_array = claims_details_array[claims_counter].split("->");
        json_string = {
            "claim_date":    claim_array[0],
            "value": claim_array[1],
            "claim_type":  claim_array[2],
            "description":    claim_array[3],
            "person_pk":    person_id      
        };
        //alert("claim "+claims_counter+" string created");
        $.ajax({
            type: "POST",
            url: 'https://localhost:3000/claims.json',
            dataType: 'application/json',
            data: {claim: json_string},
            complete: function(data){
                var str = data.responseText;
                var obj = JSON.parse(str);
                //alert("claim "+claims_counter+" posted");
                claims_counter++;
                post_claims_details(claims_details_array, person_id);
            }
        });
    }
    else{
        //alert("claims_counter = " + claims_counter);
        do_vehicle(person_id);
    }
}

function do_vehicle(person_id){
    //alert("posting vehicle");
    var vehiclereg = document.forms["vehicle_details_form"]["vehiclereg"].value;
    var vehicleannualmileage = document.forms["vehicle_details_form"]["vehicleannualmileage"].value;
    var vehiclevalue = document.forms["vehicle_details_form"]["vehiclevalue"].value;
    var vehicleparkinglocation = document.forms["vehicle_details_form"]["vehicleparkinglocation"].value;
    var vehiclepolicystartdate = document.forms["vehicle_details_form"]["vehiclepolicystartdate"].value;
    
    var json_string = {
        "registration":    vehiclereg.toUpperCase(),
        "annual_mileage": vehicleannualmileage,
        "value":  vehiclevalue,
        "parking_location":    vehicleparkinglocation.toUpperCase(),
        "policy_start_date":    vehiclepolicystartdate,
        "person_pk":    person_id        
    };   
    post_vehicle(json_string, person_id);
    //alert("vehicle posted");
}

function post_vehicle(vehicle_string, person_id){
    $.ajax({
        type: "POST",
        url: 'https://localhost:3000/vehicles.json',
        dataType: 'application/json',
        data: {vehicle: vehicle_string},
        complete: function(data){
            do_policy(person_id);     
        }
    });
}



function do_policy(person_id){
    var breakdowncover = document.forms["policy_details_form"]["breakdowncover"].checked;
    var windscreencover = document.forms["policy_details_form"]["windscreencover"].checked;
    var json_string = {
        "breakdown_cover":    breakdowncover,
        "windscreen_cover": windscreencover,
        "person_pk":    person_id
    };    
    post_policy(json_string);
}

function post_policy(policy_string){
    $.ajax({
        type: "POST",
        url: 'https://localhost:3000/policies.json',
        dataType: 'application/json',
        data: {policy: policy_string},
        complete: function(data){
            //alert("complete! :) "); 
            var responsetext = data.responseText;
            var obj = JSON.parse(responsetext);
            $("form").hide();
            $("#submit_button").hide();
            $("#home_button_form").show();
            $("#home_button").show();
            $("#details_policy_excess_title").append("Your Policy Excess");
            $("#details_policy_excess").append("£"+obj.excess);
            console.log(obj.excess);
        }
    });
};


//Validates fields on the retrieval page
function validate_retrieval_fields(){
    var empty_fields = new Array();
    
    var x = document.getElementById("retrieveemail").value;    
    if(x==null || x==""){
        empty_fields[empty_fields.length] = "Email";
    }    
    x = document.getElementById("retrieveidentifier").value;
    if(x==null || x==""){
        empty_fields[empty_fields.length] = "Identifier";
    }
    
    if(empty_fields.length > 0){
        var str = "The following fields are empty:\n";
        for(var i=0; i<empty_fields.length; i++){
            str = str + empty_fields[i] + "\n";
        }
        alert(str);
        return false;
    }
    
    
    var non_validating_fields = new Array();
    
    x = document.getElementById("retrieveemail").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
        non_validating_fields[non_validating_fields.length] = "Email";
    }    
//    x = document.getElementById("retrieveidentifier");
//    if(x <= 0){
//        non_validating_fields[non_validating_fields.length] = "Identifier";
//    }
    
    if(non_validating_fields.length > 0){
        var str2 = "The following fields are filled incorrectly:\n";        
        for(var j=0; j<non_validating_fields.length; j++){
            str2 = str2 + non_validating_fields[j] + "\n";
        }
        alert(str2);
        return false;
    }
    return true;
}

//Validates all fields on the details page
function validate_fields(number_of_claims){
    var fields_checks = new Array();
    ////REQUIRED FIELDS CHECKER DONE
    fields_checks = check_required_fields(fields_checks, number_of_claims);

    ////PRINT UNFILLED FIELDS WARNINGS
    if (fields_checks.length != 0){
        print_unfilled_fields(fields_checks);
        return false;
    }
    
    ////FORM VALIDATION
    fields_checks = check_field_formats(fields_checks, number_of_claims);
    
    ////PRINT NON VALIDATING INPUTS
    if (fields_checks.length != 0){
        print_non_validating_fields(fields_checks);
        return false;
    }    
    return true;
}


function print_unfilled_fields(unfilled_fields){
    //Printing Warnings
    if(unfilled_fields.length != 0){
        var alert_string = "The following fields need to be completed: \n";
        for(var i=0; i<unfilled_fields.length; i++){
            alert_string = alert_string + unfilled_fields[i] + "\n";
        }
        alert(alert_string);
    }
}

function print_non_validating_fields(non_validating_fields){
    //Printing Warnings
    if(non_validating_fields.length != 0){
        var alert_string = "The following fields are incorrectly filled: \n";
        for(var i=0; i<non_validating_fields.length; i++){
            alert_string = alert_string + non_validating_fields[i] + "\n";
        }
        alert(alert_string);
    }
}


function check_field_formats(non_validating_fields, number_of_claims){
    var int_regex = /^\d+$/;
    var date_regex = /^(\d{4})\/(\d{2})\/(\d{2})$/;
    
    var x = document.forms["person_details_form"]["personemail"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
        non_validating_fields[non_validating_fields.length] = "Email";
    }
    
    x = document.forms["person_details_form"]["personlicenseperiod"].value;
    if (!int_regex.test(x) || x < 0){
        non_validating_fields[non_validating_fields.length] = "license Period In Years";
    }   
    x = document.forms["person_details_form"]["personnumberofclaims"].value;
    if (!int_regex.test(x) || x < 0){
        non_validating_fields[non_validating_fields.length] = "Number of Claims in the Last 3 Years";
    }    
    //Loops through claims
    for (var i=0; i<number_of_claims; i++){        
        x = document.forms["claim_"+(i+1)+"_form"]["claimvalue"+(i+1)].value;
        if (!int_regex.test(x) || x < 0){
            non_validating_fields[non_validating_fields.length] = "Claim "+(i+1)+" Value";
        }
    }
    x = document.forms["vehicle_details_form"]["vehicleannualmileage"].value;
    if (!int_regex.test(x) || x < 0){
        non_validating_fields[non_validating_fields.length] = "Annual Mileage";
    } 
    x = document.forms["vehicle_details_form"]["vehiclevalue"].value;
    if (!int_regex.test(x) || x < 0){
        non_validating_fields[non_validating_fields.length] = "Vehicle Value";
    }    
    
    return non_validating_fields;
}


function check_required_fields(unfilled_fields, number_of_claims){
    
    //PERSON PRESENCE CHECKING
    var x = document.forms["person_details_form"]["persontitle"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Title";
    }
    x = document.forms["person_details_form"]["personforename"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Forename";
    }
    x = document.forms["person_details_form"]["personsurname"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Surname";
    }
    x = document.forms["person_details_form"]["personemail"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Email";
    }
    x = document.forms["person_details_form"]["persondob"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Date of Birth";
    }
    x = document.forms["person_details_form"]["personaddress1"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Address 1";
    }
    x = document.forms["person_details_form"]["personpostcode"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Post Code";
    }
    
    var full_license = document.getElementById('personlicensetypefull');
    var provisional_license = document.getElementById('personlicensetypeprovisional');
    if (full_license.checked == false && provisional_license.checked == false){
       unfilled_fields[unfilled_fields.length] = "License Type";
    }
    
    x = document.forms["person_details_form"]["personlicenseperiod"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "License Period";
    }
    x = document.forms["person_details_form"]["personoccupation"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Occupation";
    }
    x = document.forms["person_details_form"]["personnumberofclaims"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Number Of Claims";
    }    
    
    //CLAIMS PRESENCE CHECKING
    for(var i=0; i<number_of_claims; i++){
        x = document.forms["claim_"+(i+1)+"_form"]["claimdate"+(i+1)].value;
        if(x==null || x==""){
            unfilled_fields[unfilled_fields.length] = "Claim "+(i+1)+" date";
        }
        x = document.forms["claim_"+(i+1)+"_form"]["claimvalue"+(i+1)].value;
        if(x==null || x==""){
            unfilled_fields[unfilled_fields.length] = "Claim "+(i+1)+" value";
        }
        x = document.forms["claim_"+(i+1)+"_form"]["claimtype"+(i+1)].value;
        if(x==null || x==""){
            unfilled_fields[unfilled_fields.length] = "Claim "+(i+1)+" type";
        }
    }
    
    //VEHICLE PRESENCE CHECKING
    x = document.forms["vehicle_details_form"]["vehiclereg"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Car Registration";
    } 
    x = document.forms["vehicle_details_form"]["vehicleannualmileage"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Annual Mileage";
    } 
    x = document.forms["vehicle_details_form"]["vehiclevalue"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Vehicle Value";
    } 
    x = document.forms["vehicle_details_form"]["vehicleparkinglocation"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Vehicle Parking Location";
    } 
    x = document.forms["vehicle_details_form"]["vehiclepolicystartdate"].value;
    if(x==null || x==""){
        unfilled_fields[unfilled_fields.length] = "Vehicle Policy Start Date";
    } 
    
    return unfilled_fields;
}
