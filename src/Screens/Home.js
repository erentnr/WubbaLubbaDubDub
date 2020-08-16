import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import data from '../data.json'

const { width, height } = Dimensions.get('window');

function Home () {

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

  const renderItem = ({item}) => (
    <View style={styles.itemView}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{uri:item.image}}
        />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.statusView}>
          {getStatus({item})}
          <Text style={styles.status}>{item.status} - {item.species}</Text>
        </View>
        <Text style={styles.infoTitle}>Last known location:</Text>
        <Text style={styles.info}>{item.location.name}</Text>
        <Text style={styles.infoTitle}>Type:</Text>
        {getInfo({item})}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.containerView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}/>
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
  imageView:{
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

export default Home;
