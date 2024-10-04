import { dynamicClient } from "@/dynamic/client";
import { FC, useState } from "react";
import { View, TextInput, Button } from "react-native";

const LoginDynamic: FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    await dynamicClient.auth.email.sendOTP(email);
    setOtpSent(true);
  };

  const handleResendOTP = () => {
    dynamicClient.auth.email.resendOTP();
  };

  const handleVerifyOTP = () => {
    dynamicClient.auth.email.verifyOTP(otp);
  };

  return (
    <View>
      {!otpSent ? (
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <Button onPress={handleSendOTP} title="Send OTP" />
        </View>
      ) : (
        <View>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
          />
          <Button onPress={handleVerifyOTP} title="Verify OTP" />
          <Button onPress={handleResendOTP} title="Resend OTP" />
        </View>
      )}
    </View>
  );
};

export default LoginDynamic;
