import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ToastMessage, TT } from '../atoms/toast-message';
import Button from '../atoms/button';
import InputForm from '../molecules/input-form';

import { MAX_INPUT_LINE_LENGTH, MIN_INPUT_LENGTH } from '../../utils/constants';


export default MotorcycleForm = props => {

    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [color, setColor] = useState(null);
    const [plate, setPlate] = useState(null);

    const validateForm = () => {
        if (brand && model && color && plate) {
            props.handleSubmitMotorcycle({ brand, model, color, plate });
        } else {
            ToastMessage("Preencha os dados corretamente para continuar.", TT.ERROR);
        }
    }

    return (
        <View style={styles.container}>

            <InputForm
                label="Marca"
                placeholder="Honda"
                autoCapitalize="words"
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center
                getValue={setBrand} />

            <InputForm
                label="Modelo"
                placeholder="Broz"
                autoCapitalize="words"
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center
                getValue={setModel} />

            <InputForm
                label="Cor"
                placeholder="Azul"
                autoCapitalize="words"
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center
                getValue={setColor} />

            <InputForm
                label="Placa"
                placeholder="ABC1234"
                autoCapitalize="characters"
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center
                getValue={setPlate} />

            <View style={styles.innerContainer}>

                <Button size="lg" onPress={validateForm} value="Próximo" />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    innerContainer: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    }
});