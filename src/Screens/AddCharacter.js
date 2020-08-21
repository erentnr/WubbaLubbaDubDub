import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { addCharacter } from '../actions';
import CustomButton from '../Components/CustomButton';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

function AddCharacter (props) {

  const [name, setName] = useState()
  const [status, setStatus] = useState()
  const [species, setSpecies] = useState()
  const [gender, setGender] = useState()
  const [image, setImage] = useState(null)

  return(
    <SafeAreaView style={styles.containerView}>

      <TextInput
        style={styles.input}
        placeholder='name'
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <TextInput
        style={styles.input}
        placeholder='status'
        value={status}
        onChangeText={(value) => setStatus(value)}
      />

      <TextInput
        style={styles.input}
        placeholder='species'
        value={species}
        onChangeText={(value) => setSpecies(value)}
      />

      <TextInput
        style={styles.input}
        placeholder='gender'
        value={gender}
        onChangeText={(value) => setGender(value)}
      />

      <TouchableOpacity
        onPress={() => {
          const options = {
            title: 'Resim Seç',
            quality: 0.2,
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              setImage(source)
            }
          });
        }}
      >
        <Image
          source={image}
          defaultSource={require('../img/dummy.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </TouchableOpacity>

      <CustomButton
        buttonStyle={styles.customButton}
        textStyle={styles.buttonText}
        text='Register'
        loading={props.loading}
        buttonPress={() => {
          const params = {
            name,
            gender,
            species,
            status,
            image: image,
            type: ''
          }
          props.addCharacter(params)
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#202329',
  },
  customButton:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 0.5,
    borderRadius:4,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: width * 0.84,
    height: height * 0.07,
    backgroundColor:'#E50914',
  },
  buttonText:{
    color:'white',
    fontSize:20,
    fontWeight:'300',
    textAlign:'center',
  },
  registerText:{
    color:'white',
    fontSize:16,
    fontWeight:'300',
    textAlign:'center',
  },
  input:{
    color:'black',
    paddingLeft:width * 0.04,
    borderWidth: 0.5,
    borderRadius:4,
    backgroundColor:'white',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: width * 0.84,
    height: height * 0.07,
  },
});

const mapStateToProps = ({ listResponse }) => {
    const { loadingAddCharacter } = listResponse;
    return { loadingAddCharacter };
};

export default connect(mapStateToProps, { addCharacter })(AddCharacter);
