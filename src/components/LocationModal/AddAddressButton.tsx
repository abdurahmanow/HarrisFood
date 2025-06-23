import React from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { bottomActionAreaStyles as styles } from '../../styles/LocationModal/BottomActionAreaStyles';
import CheckmarkIcon from './CheckmarkIcon';

type Props = {
  onPress: () => void;
  isActive?: boolean;
  buttonLabel?: string;
  showAgreement?: boolean;
  agreementChecked?: boolean;
  onAgreementToggle?: () => void;
  agreementText?: React.ReactNode;
  onPolicyPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function AddAddressButton({
  onPress,
  isActive = false,
  buttonLabel = 'Добавить адрес',
  showAgreement = false,
  agreementChecked = false,
  onAgreementToggle,
  agreementText,
  onPolicyPress,
}: Props) {
  return (
    <View>
      {showAgreement && (
        <View style={styles.agreementWrapper}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              agreementChecked && styles.checkboxChecked,
            ]}
            onPress={onAgreementToggle}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {agreementChecked && (
              <View style={styles.checkmarkIconWrapper}>
                <CheckmarkIcon />
              </View>
            )}
          </TouchableOpacity>
          {agreementText ? (
            agreementText
          ) : (
            <Text style={styles.agreementText}>
              Я согласен(а) с{' '}
              <Text
                style={styles.agreementLink}
                onPress={onPolicyPress}
                suppressHighlighting
              >
                условиями обработки персональных данных
              </Text>
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          (!isActive || (showAgreement && !agreementChecked)) && styles.buttonDisabled,
        ]}
        onPress={onPress}
        disabled={!isActive || (showAgreement && !agreementChecked)}
        activeOpacity={0.82}
      >
        <Text
          style={[
            styles.buttonText,
            (!isActive || (showAgreement && !agreementChecked)) && styles.buttonTextDisabled,
          ]}
        >
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
