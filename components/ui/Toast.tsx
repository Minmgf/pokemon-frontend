import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { MotiView } from 'moti';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, type, onHide, duration = 1000 }: ToastProps) {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [duration, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return Colors.light.success;
      case 'error': return Colors.light.danger;
      case 'info': return Colors.light.secondary;
      default: return colors.primary;
    }
  };

  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 100, opacity: 0 }}
      transition={{ type: 'timing', delay: 0 }}
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
    >
      <Text style={styles.text}>{message}</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
