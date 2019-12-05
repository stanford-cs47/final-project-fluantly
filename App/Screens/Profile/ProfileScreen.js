import React from "react";
import {Image, Text, View} from "react-native";
import {MainStyles} from "../../Styles/MainStyles";
import {ProfileScreenStyles} from "../../Styles/ProfileScreenStyles";
import {getUserInfo} from "../../API/UsersAPIs";
import * as firebase from "firebase";

class ProfileScreen extends React.Component {

    state = {
        nam: '',
        profileImg: 'https://i0.wp.com/365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png',
        gender: '',
        age: 0,
        occupation: '',
        city: '',
        state: '',
        languages: [],
        interests: [],
    };

    async componentWillMount() {
        let username = this.props.navigation.state.params == null ? firebase.auth().currentUser.email : this.props.navigation.state.params.username;
        try {
            const data = await getUserInfo(username);
            this.setState(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        const {
            name,
            profileImg,
            gender,
            age,
            occupation,
            city,
            state,
            languages,
            interests,
        } = this.state;

        // process data
        const ageString = Math.floor(age / 10) * 10 + 's';
        const languagesString = languages?.sort().join(', ');
        const interestsString = interests?.sort().join(', ');

        return (
            <View style={[MainStyles.container, ProfileScreenStyles.container]}>
                <View style={ProfileScreenStyles.basicInfoContainer}>
                    <Image
                        style={ProfileScreenStyles.profileImg}
                        source={{uri: profileImg}}
                    />
                    <Text style={[MainStyles.fontExtraLarge, MainStyles.fontRegular, ProfileScreenStyles.name]}>{name}</Text>
                    <View style={ProfileScreenStyles.row}>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, ProfileScreenStyles.basicInfo, {textTransform: 'capitalize'}]}>{gender}</Text>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, ProfileScreenStyles.basicInfo,]}>, </Text>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, ProfileScreenStyles.basicInfo,]}>{ageString}</Text>
                    </View>
                </View>
                <View style={ProfileScreenStyles.miscInfoContainer}>
                    <View>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontBold, ProfileScreenStyles.miscInfoHeader]}>Occupation</Text>
                        <View style={ProfileScreenStyles.row}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, {textTransform: 'capitalize'}]}>{occupation}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontBold, ProfileScreenStyles.miscInfoHeader]}>City</Text>
                        <View style={ProfileScreenStyles.row}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, {textTransform: 'capitalize'}]}>{city}</Text>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>, </Text>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, {textTransform: 'uppercase'}]}>{state}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontBold, ProfileScreenStyles.miscInfoHeader]}>Languages</Text>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, {textTransform: 'capitalize'}]}>{languagesString}</Text>
                    </View>
                    <View>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontBold, ProfileScreenStyles.miscInfoHeader]}>Interests</Text>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, {textTransform: 'capitalize'}]}>{interestsString}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default ProfileScreen;
