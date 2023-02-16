export function  soloNumeros(e){

  console.log('eeeeeeeeeeeEE',e );

  let key = e.charCode ;

  // console.log('Paso por solo númenos');
  // console.log('KEYYY',key );
  // console.log('eeee',e.keyCode);

  if(e.keyCode===8){
    // console.log('KEYYY',e.KeyCode );
    return true;
  }

   if( !( key >= 48 && key <= 57)){

    // console.log('KEYYY',key );
     return false;
   }
   return null;
}

