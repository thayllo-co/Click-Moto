import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';


export default WelcomePassenger = props => {
    return (
        <View style={styles.container}>

            <Text title light center size="md" value="Obrigado pelo cadastro, entre e aproveite nossos serviços 🛵💨" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12
    }
});