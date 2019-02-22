//  saveJSONtoFile.js

    function saveJSONtoFile(jsonData){
        if (jsonData){
            var blob = new Blob([jsonData], {type: "application/json"});
            var url  = URL.createObjectURL(blob);
            var a = document.createElement("a");
            
            a.download = "exported json.js";
            a.href = url;
            a.onclick = destroyClickedElement;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
        }
    }

    function destroyClickedElement(event) {
    	document.body.removeChild(event.target);
    }

