import React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {Metrics} from "../Themes";
import {DrawerNavigatorItems} from "react-navigation-drawer";
import firebase from "firebase";
import { Entypo } from '@expo/vector-icons';
import {getUserInfo} from "../API/UsersAPIs";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../Themes/Colors";

export default class DrawerComponent extends React.Component {

    state = {
        profileImg: 'https://i0.wp.com/365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png',
    };

    async componentWillMount() {
        try {
            const data = await getUserInfo(firebase.auth().currentUser.email, ['name', 'profileImg']);
            this.setState(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    constructor(props) {
        super(props);
        this.state = {language: 'French'};
    }

    render() {
        const {name, profileImg} = this.state;

        return (
            <ScrollView>
                <View style={drawer.container}>
                    <View style={{paddingHorizontal: RFValue(36, 812)}}>
                        <RNPickerSelect
                            value={this.state.language}
                            onValueChange={(value) => this.setState({language: value})}
                            items={[
                                { label: 'French', value: 'French', key: 'French' },
                                { label: 'English', value: 'English', key: 'English' },
                                { label: 'Spanish', value: 'Spanish', key: 'Spanish' },
                            ]}
                            doneText={'PRACTICE IN...'}
                            style={{...pickerSelectStyles,
                                iconContainer: {
                                    top: 8,
                                    right: 12,
                                },
                            }}
                            Icon={() => <Entypo name={'chevron-down'} size={Metrics.icons.medium} />}
                        />
                    </View>

                    <View style={drawer.profilePictureContainer}>
                        <Image source={{uri: profileImg}}
                               resizeMode={'cover'}
                               style={drawer.profilePicture} />
                        <Text style={drawer.profileName}>{name}</Text>
                    </View>

                    <DrawerNavigatorItems style={{flex: 3}} {...this.props.theProps}/>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            firebase.auth().signOut()
                                .then(s => console.log('successfully logged out'))
                                .catch(e => (console.log('error', e)));
                        }}>
                            <Text style={drawer.logoutButton} >Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: RFValue(20, 812),
        color: Colors.text,
        justifyContent: 'center',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 15,
        paddingVertical: RFValue(20, 812),
        justifyContent: 'center',
        color: Colors.text,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const drawer = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: RFValue(93, 812),
    },
    profilePictureContainer: {
        height: RFValue(105, 812),
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 25
    },
    profilePicture: {
        width: RFValue(72, 812),
        height: RFValue(72, 812),
        borderRadius: RFValue(36, 812),
        margin: 5
    },
    profileName: {
        fontFamily: 'century-gothic-regular',
        fontSize: 24,
        color: Colors.primaryDark,
        marginTop: RFValue(4, 812),
    },
    logoutButton: {
        fontFamily: 'century-gothic-regular',
        fontSize: 17,
        color: Colors.secondary,
    }
});