import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import closeIcon from '../../assets/images/close.png';
import Text from '../atoms/text';
import IconButton from '../molecules/icon-button';

export default Window = props => {
    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={props.toggler}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}>

            <View style={styles.window}>

                <View style={styles.header} >

                    <View style={styles.title}>

                        <Text title light center size="sm" lines={props.lines ? props.lines : 1} value={props.title} />

                    </View>

                    <IconButton source={closeIcon} size="xs" onPress={props.toggler} />

                </View>

                {props.children}

            </View>

        </Modal >
    )
}

const styles = StyleSheet.create({
    window: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 8
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8
    },
    title: {
        flex: 1
    }
});