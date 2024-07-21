import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

import debit from '~/assets/debit.png';
import google from '~/assets/google.png';
import { InputField } from '~/components/InputField';
import { TextComp } from '~/components/TextComp';

const debitCard = Image.resolveAssetSource(debit).uri;
const googlePay = Image.resolveAssetSource(google).uri;

const Checkout = () => {
  const [selectedCard, setSelectedCard] = useState<'creditCard' | 'googlePay' | null>(null);

  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [voucherCode, setVoucherCode] = React.useState('');

  // Error State
  const [selectedCardError, setSelectedCardError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  // const [voucherCodeError, setVoucherCodeError] = useState(false);

  const validateAndSave = async () => {
    console.log('Validating and saving data:');
    let isValid = true;

    if (!selectedCard) {
      setSelectedCardError(true);
      isValid = false;
    } else {
      setSelectedCardError(false);
    }

    if (!cardNumber) {
      setCardNumberError(true);
      isValid = false;
    } else {
      setCardNumberError(false);
    }

    if (!expiryDate) {
      setExpiryDateError(true);
      isValid = false;
    } else {
      setExpiryDateError(false);
    }

    if (!cvv) {
      setCvvError(true);
      isValid = false;
    } else {
      setCvvError(false);
    }

    if (!isValid) {
      return true;
    }

    const billingDetails = {
      selectedCard,
      cardNumber,
      expiryDate,
      cvv,
      voucherCode,
    };
    await AsyncStorage.setItem('billingDetails', JSON.stringify(billingDetails));
    router.push('OrderSummary');
  };

  return (
    <View className="h-full w-full flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="gap-1 pb-3 pt-6">
          <Text className="font-[dmSemibold] text-base text-[#445469]">Payment Method</Text>

          {!selectedCard
            ? selectedCardError && (
                <TextComp
                  text="Please selected a payment method"
                  color="#F04B4B"
                  size={12}
                  family="dmSemibold"
                />
              )
            : ''}
        </View>

        <View className="flex w-full flex-row items-center gap-4">
          {/* Creadit Card */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.card,
              selectedCard === 'creditCard' ? styles.activeCard : styles.inactiveCard,
            ]}
            onPress={() => setSelectedCard('creditCard')}>
            <View className="h-12 w-14">
              <Image src={debitCard} className="h-full w-full" resizeMode="contain" />
            </View>
            <Text
              className={`font-[dmBold] text-base ${selectedCard === 'creditCard' ? 'text-[#11151A]' : 'text-black/50'}`}>
              Credit Card
            </Text>
          </TouchableOpacity>

          {/* Google pay */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedCard('googlePay')}
            style={[
              styles.card,
              selectedCard === 'googlePay' ? styles.activeCard : styles.inactiveCard,
            ]}>
            <View className="h-12 w-14">
              <Image src={googlePay} className="h-full w-full" resizeMode="contain" />
            </View>
            <Text
              className={`font-[dmBold] text-base ${selectedCard === 'googlePay' ? 'text-[#11151A]' : 'text-black/50'}`}>
              Google Play
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 gap-7">
          <InputField
            title="Card number *"
            placeholder="xxx xxx xxx"
            keyboardType="numeric"
            setStateValue={setCardNumber}
            error={cardNumber ? '' : cardNumberError ? 'This field is required' : ''}
          />

          <View className="flex-row gap-4">
            <InputField
              title="Expiration *"
              placeholder="mm/yy"
              keyboardType="numeric"
              setStateValue={setExpiryDate}
              error={expiryDate ? '' : expiryDateError ? 'This field is required' : ''}
            />

            <InputField
              title="CVV *"
              placeholder="xxx"
              keyboardType="numeric"
              setStateValue={setCvv}
              error={cvv ? '' : cvvError ? 'This field is required' : ''}
            />
          </View>
          <InputField
            title="Voucher code (optional)"
            placeholder="xxxxx"
            keyboardType="default"
            setStateValue={setVoucherCode}
            error={voucherCode ? '' : '' ? '' : ''}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full flex-1 bg-[#FAFBFC] px-4 pb-10 pt-4">
        <TouchableOpacity
          onPress={validateAndSave}
          activeOpacity={0.7}
          className="flex-1 items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
          <Text className="text-center text-base font-medium capitalize text-white">
            Confirm and continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    flex: 1,
    gap: 4,
    borderRadius: 12,
    padding: 16,
  },
  activeCard: {
    borderColor: '#3538CD',
    borderWidth: 1.1,
  },
  inactiveCard: {
    borderColor: '#CDD5DF',
    borderWidth: 1,
  },
  imageContainer: {
    height: 48,
    width: 56,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11151A',
  },
});

export default Checkout;

// className="flex-1 gap-4 rounded-xl border border-[#3538CD] p-4 pr-2.5"
