import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../../../theme/colors';


export default Card = props => (
    <Animatable.View
        duration={250}
        animation={props.position == "top" ? "slideInDown" : "bounceInUp"}
        style={[styles.windowContainer, props.style, props.position == "top" ? styles.topPosition : styles.defaultPosition]} >

        {props.children}

    </Animatable.View>
)


const styles = StyleSheet.create({
    windowContainer: {
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        borderRadius: 25,
        minHeight: 200,
        width: '100%',
        position: 'absolute',
        padding: 8,
        zIndex: 999
    },
    topPosition: {
        top: 0
    },
    defaultPosition: {
        bottom: 0
    }
});