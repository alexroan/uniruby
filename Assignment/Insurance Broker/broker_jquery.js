//This file watches out for changes in state of some of the key
//elements in the broker application.

var pnumberofclaims;
$(document).ready(function(){

    //This is called when the user enters how many claims in the previous 3
    //years they have made
    $("#personnumberofclaims").change(function(){
        $("#claims_div").empty();
        pnumberofclaims = $(this).val();
        //alert(pnumberofclaims);
        var claimformhtml = "";                
        for(var i=0; i<pnumberofclaims; i++){
            claimformhtml = "<form class=\"form-signin\" name=\"claim_"+(i+1)+
                "_form\"><h2 class=\"form-signin-heading\">Claim "+(i+1)+
                " Details</h2><h5 class=\"form-signin-heading\">Claim Date</h5><input type=\"date\" id=\"claimdate"+(i+1)+"\" name=\"claimdate"+(i+1)+
                "\" class=\"form-control\" placeholder=\"Claim Date\" required><input type=\"number\" id=\"claimvalue"+(i+1)+"\" name=\"claimvalue"+(i+1)+
                "\" class=\"form-control\" placeholder=\"Value (&pound;)\" required><input type=\"text\" id=\"claimtype"+(i+1)+"\" name=\"claimtype"+(i+1)+
                "\" class=\"form-control\" placeholder=\"Claim Type\" required><input type=\"text\" id=\"claimdescription"+(i+1)+"\" name=\"claimdescription"+(i+1)+
                "\" class=\"form-control\" placeholder=\"Description\"></form>"

            $("#claims_div").append(claimformhtml);
            $("#license_details_heading").focus();
        }
    });

    //This is called when a user submits their details for a quote request
    $("#submit_button").click(function(){
        if(validate_fields(pnumberofclaims)){
            form_data(pnumberofclaims);            
        }
    });
    
    //This is called when the user has entered their details to retrieve a 
    //previously requested quote.
    $("#retrieve_button").click(function(){
        if (validate_retrieval_fields()){
            var retrieveidentifier = document.getElementById("retrieveidentifier").value;
            var retrieveemail = document.getElementById("retrieveemail").value.toUpperCase();
            //console.log(retrieveemail.toUpperCase());
            var url = "https://localhost:3000/person/"+retrieveidentifier+".json";
            $.get(url, function(data){
                if(data == null){
                    alert("email and identifier combination does not match our records");
                }
                else{
                    if(retrieveemail.toUpperCase() == data.email){
                        $.get("https://localhost:3000/policy/"+data.id+".json", function(data2){
                            //console.log(data2.excess);
                            $("#retrieveemail").hide();
                            $("#retrieveidentifier").hide();
                            $("#retrieve_button").hide();
                            $("#policy_excess").append("£"+data2.excess);
                            if(data2.breakdown_cover == "true" || data2.breakdown_cover == "t"){
                                $("#policy_breakdown_cover").append("Breakdown Cover: Yes");
                            }
                            else{
                                $("#policy_breakdown_cover").append("Breakdown Cover: No");
                            }
                            
                            if(data2.windscreen_cover == "true" || data2.windscreen_cover == "t"){
                                $("#policy_windscreen_cover").append("Windscreen Cover: Yes");
                            }
                            else{
                                $("#policy_windscreen_cover").append("Windscreen Cover: No");
                            }
                        });
                    }
                    else{
                        alert("email and identifier combination does not match our records");
                    }
                }
                
            });{
                
            }
            
            
               
        }        
    });
});

