import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getDetail } from '../actions';
import CustomButton from '../Components/CustomButton';


const { width, height } = Dimensions.get('window');

function CharacterDetail (props) {

  useEffect(() => {
    props.getDetail(props.params)
  }, []);

  console.log(character)

  function getStatus (character) {
    if (character.status==='Alive') {
      return <View style={styles.roundAlive}/>
    } else if (character.status==='Dead') {
      return <View style={styles.roundDead}/>
    } else if (character.status==='unknown'){
      return <View style={styles.roundUnknown}/>
    }
  }

  function getInfo (character) {
    if (item.type === '') {
      return <Text style={styles.info}>-</Text>
    } else {
      return <Text style={styles.info}>{character.type}</Text>
    }
  }

  function getLocation (character) {
    if (typeof character.location !== 'undefined'){
      return <Text style={styles.info}>{character.location.name}</Text>
    } else {
      return <Text style={styles.info}>-</Text>
    }
  }

  function getImage (item) {
    if (character.image) {
      return {uri:character.image}
    } else {
      return require('../img/dummy.png')
    }
  }

  return (
    <SafeAreaView style={styles.containerView}>

    <TouchableOpacity
      style={styles.itemView}
    >
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={getImage(character)}
        />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusView}>
          {getStatus(character)}
          <Text style={styles.status}>{character.status} - {character.species}</Text>
        </View>
        <Text style={styles.infoTitle}>Last known location:</Text>
        {getLocation(character)}
        <Text style={styles.infoTitle}>Type:</Text>
        {getInfo(character)}
      </View>
      <View style={styles.removeImageView}>
        <Image
          style={styles.removeImage}
          source={require('../img/remove.png')}
        />
      </View>
    </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView:{
    backgroundColor:'#202329',
  },
  itemView:{
    maxHeight:width * 0.3,
    backgroundColor:'#3c3e44',
    alignItems:'center',
    borderRadius:10,
    overflow:'hidden',
    flexDirection:'row',
    margin:width * 0.03,
  },
  addButton:{
    elevation:8,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 0.5,
    borderRadius:height * 0.05,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: height * 0.1,
    height: height * 0.1,
    backgroundColor:'#E50914',
    right:20,
    bottom:20,
  },
  buttonText:{
    color:'white',
    fontSize:20,
    fontWeight:'300',
    textAlign:'center',
  },
  detailsView:{
    marginLeft: width * 0.03,
  },
  statusView:{
    flexDirection:'row',
    alignItems:'center',
  },
  image:{
    width: width * 0.3,
    height: width * 0.3,
  },
  removeImageView:{
    flex:1,
    alignItems:'flex-end',
    marginRight: width * 0.03,
  },
  removeImage:{
    width: width * 0.05,
    height: width * 0.05,
  },
  name:{
    fontSize:16,
    fontWeight:'700',
    color:'white',
  },
  status:{
    fontSize:10,
    fontWeight:'500',
    color:'white',
    marginLeft: width * 0.01,
  },
  infoTitle:{
    fontSize:12,
    marginTop:width * 0.01,
    color:'grey',
  },
  info:{
    fontSize:12,
    color:'white',
  },
  roundAlive:{
    height:6,
    width:6,
    borderRadius:3,
    backgroundColor:'#55cc44',
  },
  roundDead:{
    height:6,
    width:6,
    borderRadius:3,
    backgroundColor:'#ea000c',
  },
  roundUnknown:{
    height:6,
    width:6,
    borderRadius:3,
    backgroundColor:'#9e9e9e',
  },
});

const mapStateToProps = ({ listResponse }) => {
    const { loadingCharacterDetail, character } = listResponse;
    return { loadingCharacterDetail, character };
};

export default connect(mapStateToProps, { getDetail })(CharacterDetail);
