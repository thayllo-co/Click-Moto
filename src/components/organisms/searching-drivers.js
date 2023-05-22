import { StyleSheet, View } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';
import ProgressIndicator from '../atoms/progress-indicator';


export default SearchingDrivers = props => {

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center bold size="xl" value="Procurando 🛵🔍" />

                <Text paragraph center light size="sm" value="Após confirmar não será possível cancelar" />

                <Text light title center size="sm" value={props.driversSearchInfo} />

                <ProgressIndicator />

                <Button size="md" onPress={props.cancel} value="Cancelar" />

            </View>

        </Card>
    )
};


const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between'
    }
});