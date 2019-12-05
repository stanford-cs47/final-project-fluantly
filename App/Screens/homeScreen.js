import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import {HomeScreenStyles} from "../Styles/HomeScreenStyles";
import Toast from 'react-native-root-toast';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Metrics} from "../Themes";
import {MainStyles} from "../Styles/MainStyles";
import {RFValue} from "react-native-responsive-fontsize";
import {Grid, Row, Col} from 'react-native-easy-grid';


export class HomeScreen extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.navigation.getParam('driftSendStatus')){
            let toast = Toast.show(this.props.navigation.getParam('driftSendStatus'), {
                duration: 5000,
                position: 100,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            setTimeout(() => Toast.hide(toast), 4000); // hide toast after 5s
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={MainStyles.container}>
                    <TouchableOpacity style={HomeScreenStyles.buttonPrimary}
                                      onPress={() => {this.props.navigation.navigate('SendDrift')}}>
                        <ImageBackground source={require('../Images/sendDrift.png')}
                                         style={HomeScreenStyles.buttonImgContainer}
                                         imageStyle={{ borderRadius: RFValue(12, 812) }} >
                            <Text style={HomeScreenStyles.buttonText}>Send Drift Bottle</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={HomeScreenStyles.buttonPrimary}
                                      onPress={() => {this.props.navigation.navigate('PickDrift')}}>
                        <ImageBackground source={require('../Images/PickDrift.png')}
                                         style={HomeScreenStyles.buttonImgContainer}
                                         imageStyle={{ borderRadius: RFValue(12, 812) }} >
                            <Text style={HomeScreenStyles.buttonText}>Pick Up Drift Bottle</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={HomeScreenStyles.verticalSeparator}/>
                    <View style={HomeScreenStyles.buttonSecondaryContainer}>
                        <Grid>
                            <Row>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <TouchableOpacity style={HomeScreenStyles.buttonSecondary}>
                                        <Ionicons name={'md-notifications'} size={Metrics.icons.medium} color={'#2F496E'} />
                                    </TouchableOpacity>
                                </Col>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <TouchableOpacity style={HomeScreenStyles.buttonSecondary}>
                                        <MaterialIcons name={'history'} size={Metrics.icons.medium} color={'#2F496E'} />
                                    </TouchableOpacity>
                                </Col>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <TouchableOpacity style={HomeScreenStyles.buttonSecondary}>
                                        <Ionicons name={'ios-people'} size={Metrics.icons.medium} color={'#2F496E'}/>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <Text style={HomeScreenStyles.buttonSecondaryText}>Notifications</Text>
                                </Col>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <Text style={HomeScreenStyles.buttonSecondaryText}>History</Text>
                                </Col>
                                <Col style={HomeScreenStyles.ColsButtons}>
                                    <Text style={HomeScreenStyles.buttonSecondaryText}>Community</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </View>
            </SafeAreaView>
        );
    }


}
