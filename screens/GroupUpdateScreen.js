import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Text, TextInput, Button } from 'react-native-paper';
import { db } from '../firebase'

const GroupUpdateScreen = ( {navigation} ) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    fetchData()
  })

  const fetchData = async() => {
    let requestsFromDB = []

    const querySnapshot = await getDocs(query(collection(db, "events")));
    querySnapshot.forEach((doc) => {
        requestsFromDB.push({...doc.data(), id:doc.id})
    });
    setRequests(requestsFromDB)
  }

  const Submit = async() => {
    try {
      const docRef = await addDoc(collection(db, "groups"), {
        name: name,
        location: location,
        email: email,
        phone: phone,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text variant = "headlineSmall">Update Data</Text>
        <TextInput onChangeText = {setName} placeholder = 'Name' />
        <TextInput onChangeText = {setLocation} placeholder = 'Location' />
        <TextInput onChangeText = {setEmail} placeholder = 'Email' />
        <TextInput onChangeText = {setPhone} placeholder = 'Phone' />
        <Button mode = 'elevated' onPress = {Submit} style = {{justifyContent: 'flex-end'}}>Update</Button>
      </View>
    </SafeAreaView>
  )
}

export default GroupUpdateScreen

const styles = StyleSheet.create({})
