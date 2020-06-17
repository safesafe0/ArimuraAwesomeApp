import React from 'react';
import storage, { firebase } from '@react-native-firebase/storage';

function UploadImage(image,type){
  if (image){
    const id=Math.random()*100000000000000000;
    const iid=Math.random()*100000000000000000;
    const uuid=''+id+''+iid;
    const fileName=uuid+'.'+type.split('/').pop();
    console.log(fileName);
    storage()
    .ref('post')
    .child('img')
    .child(fileName)
    .putFile(image)
    .on(storage.TaskEvent.STATE_CHANGED,
      function(snapshot){
        const progress = (snapshot.bytesTransferred)*100;
        console.log('Upload is '+progress+'% done');
        switch(snapshot.state){
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },function(error){
        console.log("image upload error: " + error.toString());
      }, function(){
        storage()
        .ref('post')
        .child('img')
        .child(fileName)
        .getDownloadURL()
        .then(function(downloadURL){
          console.log('File available at',downloadURL);
        });
      });
  }else{

  }
}
