import React, { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getList, removeCharacter } from '../actions';
import CustomButton from '../Components/CustomButton';

const { width, height } = Dimensions.get('window');

function Home (props) {

  useEffect(() => {
    props.getList()
  }, []);

  function getStatus ({item}) {
    if (item.status==='Alive') {
      return <View style={styles.roundAlive}/>
    } else if (item.status==='Dead') {
      return <View style={styles.roundDead}/>
    } else if (item.status==='unknown'){
      return <View style={styles.roundUnknown}/>
    }
  }

  function getInfo ({item}) {
    if (item.type === '') {
      return <Text style={styles.info}>-</Text>
    } else {
      return <Text style={styles.info}>{item.type}</Text>
    }
  }

  function getLocation ({item}) {
    if (typeof item.location !== 'undefined'){
      return <Text style={styles.info}>{item.location.name}</Text>
    } else {
      return <Text style={styles.info}>-</Text>
    }
  }

  function getImage ({item}) {
    if (item.image) {
      return {uri:item.image}
    } else {
      return require('../img/dummy.png')
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemView}
      onPress= {() => {
        props.navigation.navigate('Character Detail', {id:item._id})
      }}
    >
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={getImage({item})}
        />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.statusView}>
          {getStatus({item})}
          <Text style={styles.status}>{item.status} - {item.species}</Text>
        </View>
        <Text style={styles.infoTitle}>Last known location:</Text>
        {getLocation({item})}
        <Text style={styles.infoTitle}>Type:</Text>
        {getInfo({item})}
      </View>
      <View style={styles.removeImageView}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Uyarı",
            "Silmek istediğinizden emin misiniz?",
            [
              {
                text: "İptal",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Evet", onPress: () => {
                props.removeCharacter({ id: item._id })
              }}
            ],
            { cancelable: false }
          );
        }}
      >
        <Image
          style={styles.removeImage}
          source={require('../img/remove.png')}
        />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.containerView}>
      <FlatList
        data={props.list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <CustomButton
        buttonStyle={styles.addButton}
        textStyle={styles.buttonText}
        text='+'
        buttonPress={() => {
          props.navigation.navigate('Add Character')
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView:{
    backgroundColor:'#202329',
  },
  itemView:{
    maxHeight:width * 0.3,
    backgroundColor:'white',
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
    borderWidth: 0.1,
    borderRadius:height * 0.05,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: height * 0.1,
    height: height * 0.1,
    backgroundColor:'white',
    right:20,
    bottom:20,
  },
  buttonText:{
    color:'black',
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
    color:'black',
  },
  status:{
    fontSize:10,
    fontWeight:'500',
    color:'black',
    marginLeft: width * 0.01,
  },
  infoTitle:{
    fontSize:12,
    marginTop:width * 0.01,
    color:'grey',
  },
  info:{
    fontSize:12,
    color:'black',
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
    const { loadingList, list } = listResponse;
    return { loadingList, list };
};

export default connect(mapStateToProps, { getList, removeCharacter })(Home);
