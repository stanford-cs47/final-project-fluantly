import React from 'react';
import {StyleSheet, Text, SafeAreaView, View, TextInput, Image} from 'react-native';
import {Grid, Col} from 'react-native-easy-grid'
import { Button } from 'react-native-elements';
import { material } from 'react-native-typography';
import firebase from 'firebase';
import firestore from '../../../firebase';

export default class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={material.body2}>Unsplash</Text>
                    <Text style={[material.caption, {fontSize: 10}]}>Login</Text>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: '',
            loginEmail: '',
            loginPassword: '',
            errorMessageLogin: '',
        }
    }

    componentWillMount() {
        // firebase.auth().signOut()
        //     .then(s => console.log(s))
        //     .catch(e => (console.log('error', e)));
    }

    // Check out this link to learn more about firebase.auth()
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
    signUp = async () => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword);
            if(response.user) {
                const user = firebase.auth().currentUser;
                var userDocRef = firestore.doc('users/' + user.uid);

                // Since my document doesn't exist, userDocRef.set will
                // create the document for me
                userDocRef.set({
                    name: this.state.signUpName
                });
                this.props.updateStatus();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Check out this link to learn more about firebase.auth()
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
    login = async () => {
        try {
            // Note that we don't have to tell the app that the user has logged in.
            // firebase.auth().onAuthStateChanged() in App.js communicates this for us!
            await firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1, width: '80%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 30, marginTop: 100}}>
                    <Image source={require('../../Images/logo.png')} resizeMode={'contain'} style={{width: '100%', height: '100%', margin: 5}} />
                    <Text>Learn language. Make friends.</Text>
                </View>

                <View style={{flex: 2, width: '90%', alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                        style={[styles.input, {marginTop: 50}]}
                        value={this.state.loginEmail}
                        onChangeText={(loginEmail) => this.setState({ loginEmail })}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.loginPassword}
                        secureTextEntry={true}
                        onChangeText={(loginPassword) => this.setState({ loginPassword })}
                        placeholder="Password"
                    />

                    <Grid>
                        <Col style={{paddingRight: 10}}>
                            <Button
                                title='Login'
                                onPress={()=> this.login()}
                                buttonStyle={{backgroundColor: '#2988BC'}}
                                // color='#2988BC'
                                // style={{width: '90%'}}
                            />
                        </Col>
                        <Col style={{paddingLeft: 10}}>
                            <Button
                                title='Sign up'
                                onPress={()=> console.log('sign up soon')}
                                buttonStyle={{backgroundColor: '#D5D5D5'}}
                                titleStyle={{color: '#2988BC'}}
                                // color='#D5D5D5'
                                // style={{width: '90%'}}
                            />
                        </Col>
                    </Grid>
                </View>



                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    value={this.state.signUpName}*/}
                {/*    onChangeText={(signUpName) => this.setState({ signUpName })}*/}
                {/*    placeholder="Your username"*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    value={this.state.signUpEmail}*/}
                {/*    onChangeText={(signUpEmail) => this.setState({ signUpEmail })}*/}
                {/*    placeholder="Your email"*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    value={this.state.signUpPassword}*/}
                {/*    secureTextEntry={true}*/}
                {/*    onChangeText={(signUpPassword) => this.setState({ signUpPassword })}*/}
                {/*    placeholder="Your password"*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    title="Sign Up"*/}
                {/*    onPress={()=> this.signUp()}*/}
                {/*    color={'red'}*/}
                {/*/>*/}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        fontSize: 20,
        height: 50,
        marginBottom: 20,
        backgroundColor: 'whitesmoke',
        padding: 5,
        borderRadius: 5,
    },
    button: {
        marginBottom: 50
    }
});