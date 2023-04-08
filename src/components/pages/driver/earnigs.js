import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../../templates/background-default';
import Text from '../../atoms/text';
import Header from '../../molecules/header';

export default Earnings = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [todaysRidesQuantity, settodaysRidesQuantity] = useState(0);
    const [todaysRidesValue, settodaysRidesValue] = useState(0);
    const [thisMonthRidesQuantity, setthisMonthRidesQuantity] = useState(0);
    const [thisMonthRidesValue, setthisMonthRidesValue] = useState(0);
    const [allRidesQuantity, setallRidesQuantity] = useState(0);
    const [allRidesValue, setallRidesValue] = useState(0);


    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack center navigation={props.navigation} header="GANHOS 💰" />

            <Text title light center size="lg" value={"Hoje - " + todaysRidesQuantity + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + todaysRidesValue.toFixed(2)} />

            <Text title light center size="lg" value={"Mês - " + thisMonthRidesQuantity + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + thisMonthRidesValue.toFixed(2)} />

            <Text title light center size="lg" value={"Tudo - " + allRidesQuantity + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + allRidesValue.toFixed(2)} />

        </BackgroundDefault>
    );
}