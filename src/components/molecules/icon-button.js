import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import { selectSizeHelper } from '../../utils/fuctions';

import Text from '../atoms/text';


export default IconButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={[
                styles.option,
                (props.filled ? styles.buttonWrapper : null),
                (props.success ? { backgroundColor: colors.success } : null),
                (props.danger ? { backgroundColor: colors.danger } : null),
                (props.labelPosition == "horizontal" ? styles.horizontalLabel : null),
                props.style
            ]} >

            <Image source={props.source} style={[styles.iconOption,
            (selectSizeHelper(props.size, styles.xs, styles.sm, styles.md, styles.lg, styles.xl))]} />

            {(props.label && props.dark) &&
                <Text paragraph dark center size="md" value={props.label} />}

            {(props.label && props.light) &&
                <Text paragraph light center size="md" value={props.label} />}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        justifyContent: 'center'
    },
    buttonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 6,
        paddingTop: 6,
        margin: 6,
        alignSelf: 'center'
    },
    iconOption: {
        alignSelf: 'center'
    },
    xs: {
        width: 25,
        height: 25,
    },
    sm: {
        width: 50,
        height: 50,
    },
    md: {
        width: 75,
        height: 75,
    },
    lg: {
        width: 100,
        height: 100,
    },
    xl: {
        width: 150,
        height: 150,
    },
    horizontalLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});