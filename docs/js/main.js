const form  = document.getElementsByTagName('form')[0];

const groups = document.getElementsByClassName('form-group-input');
 
form.addEventListener('input', function (event) {
    for(var i = 0; i < groups.length ; i++){
      if(groups[i].querySelector('input').value !=''){
        validateInput(i);
      }
      
    }
  });


function validateInput(i){
    if(groups[i].querySelector('input').validity.valid) {
      groups[i].querySelector('span').innerHTML = ''; 
      groups[i].querySelector('span').className = ''; 
      groups[i].querySelector('input').className = 'correct';
      groups[i].querySelector('img').className = '';
    } 
    else {
        showError(groups[i]);
    }
    /*if(groups[i].querySelector('input').value == ""){
      groups[i].querySelector('input').className = '';
      groups[i].querySelector('img').className = '';
    }*/
}

function enviar(){
  var validate = 0;
  for(var i= 0; i < groups.length; i++){
    if(groups[i].querySelector('input').validity.valid && groups[i].querySelector('input').value != ''){
      validate++;
    }
    if(validate == groups.length){
      form.submit();
    }else{
      showError(groups[i]);
      event.preventDefault();
    }
  }
 
}

function showError(group) {
    if(group.querySelector('input').validity.valueMissing) {
      group.querySelector('span').innerText = 'Looks like this is not an '+ group.id;
      changeStateError(group);

    } else if(group.querySelector('input').validity.typeMismatch) {
      group.querySelector('span').innerText = 'Looks like this is not an '+ group.id;
      changeStateError(group);
    
    } else if(group.querySelector('input').value == '' || group.querySelector('input').validity.tooShort) {
      if(group.querySelector('input').value == ''){
        group.querySelector('span').innerText =  jsUcfirst(group.id) + ' cannot be empty';
        changeStateError(group);
      
      }
      else{
        group.querySelector('span').innerText =  jsUcfirst(group.id) + ' is too short';
        changeStateError(group);
        
      }
    }
   

    
    
  
}

function changeStateError(group){
  group.querySelector('input').className = 'is_error';
  group.querySelector('img').className = 'show';
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}