import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';


export default MapInputPlace = props => {

    return (
        <GooglePlacesAutocomplete
            placeholder={props.location != null ? props.location?.title : "Para onde vamos?"}
            onPress={(data, details = null) => props.onLocationSelected(props.index, details)}
            query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'pt',
                components: 'country:br',
            }}
            textInputProps={{
                autoCapitalize: 'none',
                autoCorrect: false,
                placeholderTextColor: 'white'
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: Platform.select({ ios: 70 + (props.index * 52), android: 20 + (props.index * 52) }),
                    width: '100%'
                },
                textInputContainer: {
                    flex: 1,
                    height: 44,
                    marginHorizontal: 12,
                },
                textInput: {
                    height: 44,
                    paddingHorizontal: 12,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'darkgray',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: 18,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    textAlign: 'left'
                },
                listView: {
                    borderRadius: 0,
                    marginHorizontal: 12,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    backgroundColor: 'black',
                    zIndex: 9999
                },
                description: {
                    fontSize: 16,
                    color: 'white'
                },
                row: {
                    backgroundColor: 'transparent',
                    padding: 13,
                    height: 48,
                    flexDirection: 'row'
                }
            }}
        />
    )
};
