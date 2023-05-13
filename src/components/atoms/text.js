import { StyleSheet, Text } from 'react-native';

import colors from '../../theme/colors';
import { SIZES } from '../../utils/constants';

export default TextCostumized = props => {
    let styleArray = [styles.default];

    (props.title && props.size === SIZES.XL) ? styleArray.push(styles.titleXL) : null;
    (props.title && props.size === SIZES.LG) ? styleArray.push(styles.titleLG) : null;
    (props.title && props.size === SIZES.MD) ? styleArray.push(styles.titleMD) : null;
    (props.title && props.size === SIZES.SM) ? styleArray.push(styles.titleSM) : null;
    (props.title && props.size === SIZES.XS) ? styleArray.push(styles.titleXS) : null;

    (props.paragraph && props.size === SIZES.XL) ? styleArray.push(styles.paragraphXL) : null;
    (props.paragraph && props.size === SIZES.LG) ? styleArray.push(styles.paragraphLG) : null;
    (props.paragraph && props.size === SIZES.MD) ? styleArray.push(styles.paragraphMD) : null;
    (props.paragraph && props.size === SIZES.SM) ? styleArray.push(styles.paragraphSM) : null;
    (props.paragraphX && props.size === SIZES.XS) ? styleArray.push(styles.paragraphXS) : null;

    (props.light) ? styleArray.push(styles.light) : null;
    (props.dark) ? styleArray.push(styles.dark) : null;
    (props.highlight) ? styleArray.push(styles.highlight) : null;
    (props.danger) ? styleArray.push(styles.danger) : null;

    (props.left) ? styleArray.push(styles.left) : null;
    (props.right) ? styleArray.push(styles.right) : null;
    (props.center) ? styleArray.push(styles.center) : null;

    (props.link) ? styleArray.push(styles.link) : null;
    (props.bold) ? styleArray.push(styles.bold) : null;

    return (
        <Text style={styleArray} onPress={props.onPress} numberOfLines={props.lines} ellipsizeMode="tail">{props.value}</Text>
    )
};

const styles = StyleSheet.create({
    default: {
        flexWrap: 'wrap',
    },
    light: {
        color: colors.textLight
    },
    dark: {
        color: colors.textDark
    },
    highlight: {
        color: colors.textHighlight
    },
    danger: {
        color: colors.textDanger
    },
    center: {
        textAlign: 'center'
    },
    left: {
        textAlign: 'left'
    },
    right: {
        textAlign: 'right'
    },
    link: {
        textDecorationLine: 'underline',
    },
    bold: {
        fontWeight: 'bold'
    },
    titleXL: {
        fontSize: 30
    },
    titleLG: {
        fontSize: 28
    },
    titleMD: {
        fontSize: 26
    },
    titleSM: {
        fontSize: 24
    },
    titleXS: {
        fontSize: 22
    },
    paragraphXL: {
        fontSize: 20
    },
    paragraphLG: {
        fontSize: 18
    },
    paragraphMD: {
        fontSize: 16
    },
    paragraphSM: {
        fontSize: 14
    },
    paragraphXS: {
        fontSize: 12
    },
});