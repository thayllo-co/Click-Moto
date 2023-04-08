import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import RideListItem from '../molecules/ride-list-item';

export default RidesHistory = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Histórico de Viagens" />

            <View style={styles.listWrapper}>

                {user?.rides &&
                    user?.rides.map((data, index) =>
                        <RideListItem
                            key={index}
                            ride={data}
                            navigation={this.props.navigation} />
                    )
                }

            </View>

        </BackgroundDefault>
    );
}

const styles = StyleSheet.create({
    listWrapper: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "white"
    }
});