import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';


export default RatingForm = props => {

    const [rating, setRating] = useState(5);

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center bold size="xl" value="Obrigado 💛!" />

                <Text light title center size="md" value="Avaliação da sua corrida:" />

                <AirbnbRating
                    count={5}
                    reviews={["Terrível", "Ruim", "Okay", "Bom", "Ótimo"]}
                    starContainerStyle={{ width: '100%', justifyContent: 'space-evenly', marginBottom: 12 }}
                    defaultRating={rating}
                    size={40}
                    onFinishRating={r => setRating(r)}
                />

                <View style={styles.buttonRow}>

                    <Button size="sm" onPress={props.dismiss} value="Sair" />

                    <Button size="sm" onPress={() => props.nextAction(rating)} value="Avaliar" />

                </View>

            </View>

        </Card>
    )
};


const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});