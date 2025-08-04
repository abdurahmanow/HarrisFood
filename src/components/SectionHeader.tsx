import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type SectionHeaderProps = {
  title: string;
  category?: string; // Меню: Мангалы
  onPressRight?: () => void;
  rightText?: string; // "Все" или "Назад"
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  categoryStyle?: TextStyle;
  rightTextStyle?: TextStyle;
  subtitleDescription?: string; // Описание ниже
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  category,
  onPressRight,
  rightText,
  rightElement,
  style,
  titleStyle,
  categoryStyle,
  rightTextStyle,
  subtitleDescription,
}) => (
  <View style={[styles.wrapper, style]}>
    <View>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {!!category && (
            <Text style={[styles.category, categoryStyle]}>: {category}</Text>
          )}
        </View>
        {(rightText || rightElement) && (
          <TouchableOpacity
            onPress={onPressRight}
            activeOpacity={onPressRight ? 0.7 : 1}
            style={styles.rightButton}
            disabled={!onPressRight}
          >
            {rightText && (
              <Text style={[styles.rightText, rightTextStyle]}>
                {rightText}
              </Text>
            )}
            {rightElement}
          </TouchableOpacity>
        )}
      </View>
      {subtitleDescription ? (
        <Text style={styles.subtitleDescription}>{subtitleDescription}</Text>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 0,
    marginBottom: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#222',
    fontFamily: 'Inter18Bold', // Inter, 600
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19, // 120% от 16px
  },
  category: {
    color: '#FF9900',
    fontFamily: 'Inter18Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
  },
  rightButton: {
    minWidth: 40,
    marginLeft: 10,
    alignItems: 'flex-end',
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  rightText: {
    color: '#FF9900',
    fontFamily: 'Inter18Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
  },
  subtitleDescription: {
    marginTop: 2,
    color: '#A1A1A1', // Второстепенный
    fontFamily: 'Inter18Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default SectionHeader;
