function jumpClick(){
    var textvalue = $("input[class='form-control']").val();
    if(textvalue.length!=''){
        $("#answer ").html("");
       $.ajax({
            async: true,                                              
            url: "http://bigcode.fudan.edu.cn/kg/sentenceSearch/",    
            type: "post",                                             
            contentType: "application/json; charset=utf-8",           
            data: JSON.stringify({"os_question":textvalue}),              
            error: function (xhr, status, errorThrown) {              
                console.log("Error " + errorThrown);
                console.log("Status: " + status);
                console.log(xhr)
            },
            success: function(d){
                if(d=="fail"){
                    alert("search failed") 
                }else{
                    sentences = d["sentence_list"]
                    if(sentences.length == 0){
                        alert("warning","Can't find related sentence!")
                    }else{  
                        s = "<tr><td>" + "doc_id" + "</td><td>" + "text" + "</td><td>" ; 
                         $("#answer").append(s);   
                        sentences.forEach(function(line,index,sentences){
                            s = "<tr><td>" + line.doc_id + "</td><td>" + line.text + "</td><td>" ;
                            $("#answer").append(s);           
                        })  
                        $("#answer").style.display='block';
                    }
                }
            }                          
        });
    }else{
        alert("empty input");
    }   
}

function keyup_submit(e){ 
  var evt = window.event || e; 
    if (evt.keyCode == 13){
     jumpClick();
   }
}
