import { StyleSheet, View } from 'react-native';


import RideListItem from '../molecules/ride-list-item';


export default RidesList = props => (
    <View style={styles.listWrapper}>

        {(props?.rides && props?.rides[0]?.itinerary) &&
            props?.rides.map((data, index) =>
                <RideListItem
                    key={index}
                    ride={data} />
            )
        }

    </View>
);

const styles = StyleSheet.create({
    listWrapper: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "white"
    }
});