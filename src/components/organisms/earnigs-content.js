import { View } from 'react-native';

import Text from '../../atoms/text';

export default EarningsContent = props => {

    return (
        <View>

            <Text title center size="lg" value="" />

            <Text title light center size="lg" value={"Hoje - " + (props?.user?.todaysRidesQuantity || 0) + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + (props?.user?.todaysRidesValue || 0).toFixed(2)} />

            <Text title light center size="lg" value={"Mês - " + (props?.user?.thisMonthRidesQuantity || 0) + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + (props?.user?.thisMonthRidesValue || 0).toFixed(2)} />

            <Text title light center size="lg" value={"Tudo - " + (props?.user?.allRidesQuantity || 0) + " corridas"} />

            <Text title highlight center bold size="xl" value={"R$ " + (props?.user?.allRidesValue || 0).toFixed(2)} />

        </View>
    );
}