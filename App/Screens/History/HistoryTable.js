import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import HistoryRow from "./HistoryRow";
import {TabViewStyles} from "../../Styles/MainStyles";

class HistoryTable extends React.Component {

    getTable() {
        const {recordings} = this.props;
        let table = [];
        if (recordings != null) {
            for (let i = 0; i < recordings.length; i++) {
                const entryItem =
                    <TouchableOpacity key={i}
                                      onPress={() => {this.props.navigation.navigate('HistoryDetail', {"recording": recordings[i]})}}>
                        <HistoryRow recording={recordings[i]} />
                    </TouchableOpacity>;
                table.push(entryItem);
            }
        }
        return table;
    }

    render() {
        return (
            <ScrollView>
                <View style={TabViewStyles.tabScene}>
                    {this.getTable()}
                </View>
            </ScrollView>
        );
    }
}

export default HistoryTable;