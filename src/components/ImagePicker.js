import ImagePicker from 'react-native-image-picker';

function Imagepicker({updateImage, updateType}) {
  let options = {
    title: '画像を選択',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      updateImage(response.uri);
      updateType(response.type);
    }
  });
}

export default Imagepicker;
