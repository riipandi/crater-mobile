import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { connect } from 'react-redux';
import styles from './styles';
import { AssetImage } from '../AssetImage';
import { CtGradientButton } from '../Button';
import { Text } from 'react-native-elements';
import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';

export class UpdateAppVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.UPDATE_APP_VERSION });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onUpdateApp = () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);

        Platform.OS === 'android'
            ? Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.craterapp.app'
              )
            : Linking.openURL('http://itunes.apple.com/app/id1489169767');
    };

    render() {
        const { locale } = this.props;
        const { loading } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.logoContainer}>
                        <AssetImage
                            imageSource={IMAGES.LOGO_DARK}
                            imageStyle={styles.imgLogo}
                        />
                    </View>

                    <View style={styles.bodyContainer}>
                        <Text h4 style={styles.title}>
                            {Lng.t('updateApp.title', { locale })}
                        </Text>

                        <Text h6 style={styles.description}>
                            {Lng.t('updateApp.description', { locale })}
                        </Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <CtGradientButton
                            onPress={() => this.onUpdateApp()}
                            btnTitle={Lng.t('button.updateCapital', { locale })}
                            loading={loading}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {};

//  connect
const UpdateAppVersionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateAppVersion);

UpdateAppVersionContainer.navigationOptions = () => ({
    header: null
});

export default UpdateAppVersionContainer;
