import React from 'react'
import {Text, View} from "react-native";
import {ProgressScreenStyles} from "../../Styles/ProgressScreenStyles";
import {MainStyles} from "../../Styles/MainStyles";

export class ProgressBarChart extends React.Component {
    getBarChart() {
        const {data} = this.props;
        const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let chart = [];
        let label = [];
        for (let i = 0; i < 7; i ++) {
            const chartItem =
                <View key={i} style={ProgressScreenStyles.progressBarItemContainer}>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, ProgressScreenStyles.progressBarItemText]}>{data[i]}</Text>
                    <View style={[ProgressScreenStyles.progressBarItem, {height: data[i] * 5}]} />
                </View>;
            const labelItem =
                <View key={i} style={ProgressScreenStyles.progressBarItemContainer}>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, ProgressScreenStyles.progressBarItemText]}>{weeks[i]}</Text>
                </View>;
            chart.push(chartItem);
            label.push(labelItem);
        }
        return (
            <>
                <View style={[ProgressScreenStyles.progressBarRow, ProgressScreenStyles.progressBarRowChart]}>{chart}</View>
                <View style={ProgressScreenStyles.progressBarRow}>{label}</View>
            </>
        );
    }

    render () {
        return (
            <View style={ProgressScreenStyles.progressBarChartContainer}>
                {this.getBarChart()}
            </View>
        );
    }
}