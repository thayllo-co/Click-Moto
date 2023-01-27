import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import colors from '../../theme/colors';


export default LoadingIndicator = props => (
    <View style={props.style}>

        <ActivityIndicator size="large" color={colors.primary} />

    </View>
);