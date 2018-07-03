

app.controller("csvCtrl", function($scope) {

  $scope.processData = function() {

     document.getElementById("info_file").innerHTML ="----------"; //just to inform user 
        var text = document.getElementById("textZone").value;

    // split content based on new line
    var allLines = text.split(/\r\n|\n/);
    var headers = allLines[0].split(',');
    var countLines=allLines.length;
    var countcolumn=headers.length;
    document.getElementById("info_file").innerHTML = "- This file have "  + countLines+ "  lines and " + countcolumn+" columns."; // in process done
    var lines = [];
    var counterror=0;
    for ( var i = 0; i < allLines.length; i++) {
      // split content based on comma
      var data = allLines[i].split(',');

      if (data.length == headers.length) {
        var col= [];
        
        for ( var j = 0; j < headers.length; j++) {

//++++++++++++++++++++++++++++ clean data ++++++++++++++++++++++++++++++++++++++++ start ++++++++++++++++++++++++++++++++

            if (data[j]=="f" )
            {
            data[j] =  "Female";

            counterror++;

            }
            if (data[j]=="m")
            {
            data[j] =  "Male";
            counterror++;
            }

//++++++++++++++++++++++++++++ clean data +++++++++++++++++++++++++++++++++++++++   end  ++++++++++++++++++++++++++
          col.push(data[j]);


 if (data[j].length == 1 && (j>0) ) {
   var information_message = document.getElementById("update_file2");
    information_message.innerHTML += "- The cell ("+ i +", "+j + ") may have erro (length equal to one character.<br />"   //just to inform user if the program did any change;
        } 





        }  
        lines.push(col)
      }
    }

          if (counterror>0)
            document.getElementById("update_file1").innerHTML =" -  We updated "+ counterror + " value in this file.";//just to inform user if the program did any change

    $scope.data = lines;
  };
});



var selectedFile =''; 

function loadFileAsText(){

selectedFile = document.getElementById("selectedFile").files[0];



//check if the file is an csv file----------start
 var fileName= document.getElementById("selectedFile").value;

 var fileLength= fileName.length;
  if (fileName.substring(fileLength-4,fileLength)!=".csv")
    {
      alert ('"'+ fileName+ '"' +' is not an csv file'+'\n'+'Please, try again.');
    
  }
  
//check if the file is an csv file----------end



    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("textZone").value = textFromFileLoaded;
    };
    fileReader.readAsText(selectedFile, "UTF-8");
     document.getElementById("info_file").innerHTML ="Your file is loaded. Please click 'on display button' to see your data"; //just to inform user 
}


 