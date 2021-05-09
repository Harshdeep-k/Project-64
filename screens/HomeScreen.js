import *as  React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';
import { TextInput} from "react-native-gesture-handler";
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from "expo-font";
import db from "./database";

export default class HomeScreen extends React.Component
{
    constructor()
    {
        super();
        this.state={
            text:"",
            isSearchPressed: false,
            word: "",
            lexicalCategory: "",
            examples: [],
            definition:"",
        }
    }

    getWord=(word)=>
    {
     
      var text=word.toLowerCase();
       if(db[text])
       {
      try{
        var letter=db[text]["word"];
        var lexicalCategory=db[text]["lexicalCategory"];
        var definition=db[text]["definition"];

        this.setState({
          word:letter,
          lexicalCategory: lexicalCategory,
          definition: definition,
        })
      }
      catch(err){
      alert("There is no word found");
      this.setState({
          text:"",
          isSearchPressed:false,
        })
     }
       }
       else{
         alert("The database does not have the word you are looking for")
       }
  }



    componentDidMount = async() => {
       //styling using custom fonts
    await Font.loadAsync({
      // add as many fonts as you want here .... 
      Itim: require("./fonts/Itim-Regular.ttf")
    });
  };

  render()
  {
    return(
      <ImageBackground source={require("./assets/books.jpg")} style={styles.image}>
      
      <SafeAreaProvider> 
      <View style={styles.container}>
      <Header centerComponent={{text:"Pocket Dictionary", style:[styles.text,{height:45,fontSize:23,color:"white",fontStyle:"normal"}] }}  backgroundColor="#401A3F" />
   </View>
      <TextInput
      style={styles.input}
      onChangeText={text=>
            {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading.......",
                    lexicalCategory:"",
                    examples: [],
                    definition: "" ,               
                })
            }}
            value={this.state.text}
      ></TextInput>

      <TouchableOpacity style={styles.search} onPress={()=>{
       
          this.setState({isSearchPressed:true});
          this.getWord(this.state.text);
      }}>
          <Text style={{color:"white", fontFamily:"Itim", fontWeight:"bold",fontSize:20}}>Search</Text>
      </TouchableOpacity>
  

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Word: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.word}{"\n\n"}
        </Text>
        </View>

        <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Type: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.lexicalCategory}{"\n\n"}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Definition: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.definition}{"\n\n"}
        </Text>
      </View>
 
   
      </SafeAreaProvider>
          </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundImage: uri(require("./assets/books.jpg")),
    backgroundColor: '#fff',
  },
  text:
  {
    fontSize:20,
    fontFamily:"Itim",
    fontStyle:"italic",
   // fontWeight:"italics",
    marginRight:12,
    textAlign:"center" ,
    justifyContent:"center",
    alignItems:"center",
  },
  details:
  {
   flexDirection: "row", 
   flexWrap:"wrap",
   alignContent:"center",
   justifyContent:"center",
  },
  detailsTitle:
  {
     fontSize:20,
    fontFamily:"Itim",
    fontWeight:"bold",
    marginRight:12,
    textAlign:"center" 
  },
  search:
  {
    height: 35,
    width:"50%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#401A3F',
    color:"white",
    marginTop:10,  
    marginLeft:"25%",
    marginBottom:20,
    borderRadius: 7,
  },
  image:
  {
    height:"100%",
    width:"100%",
  },
  input:
  {
    borderColor:"black",
    borderWidth:3,
    borderRadius: 10,
    color:"gray",
    fontFamily:"Itim",
    fontSize:20,
    marginTop:50,
    width:200,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    alignContent:"center",
    marginLeft:"19%",
    textAlign:"center",
  }
});
