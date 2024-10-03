import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import { CAPSULE_API_KEY } from "@/constants/keys";
import { webcrypto } from "crypto";

const Login = () => {
  console.log("Login component rendered");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const capsule = new CapsuleMobile(Environment.BETA, CAPSULE_API_KEY);
  console.log("CapsuleMobile instance created");

  useEffect(() => {
    capsule.init();
  });

  const handleCreateUser = async (): Promise<void> => {
    console.log("handleCreateUser called with email:", email);
    try {
      await capsule.createUser(email);
      console.log("User created successfully");
      setMessage("User created. Verification email sent.");
      setStep(2);
    } catch (error) {
      console.error("Error in handleCreateUser:", error);
      setMessage(`Error creating user: ${error}`);
    }
  };

  const handleVerifyEmail = async (): Promise<void> => {
    console.log("handleVerifyEmail called with code:", verificationCode);
    try {
      const biometricsId = await capsule.verifyEmailBiometricsId(
        verificationCode
      );
      console.log("Email verified successfully, biometricsId:", biometricsId);
      setMessage("Email verified successfully");
      await handleRegisterPasskeyAndCreateWallet(email, biometricsId);
    } catch (error) {
      console.error("Error in handleVerifyEmail:", error);
      setMessage(`Error verifying email: ${error}`);
    }
  };

  const handleRegisterPasskeyAndCreateWallet = async (
    email: string,
    biometricsId: string
  ): Promise<void> => {
    console.log("handleRegisterPasskeyAndCreateWallet called", {
      email,
      biometricsId,
    });
    try {
      // await capsule.registerPasskey(email, biometricsId, webcrypto);
      await capsule.registerPasskey(
        email,
        biometricsId,
        crypto as webcrypto.Crypto
      );
      console.log("Passkey registered successfully");
      setMessage("Passkey registered successfully");

      const { wallets, recoverySecret } =
        await capsule.createWalletPerMissingType(false);
      console.log("Wallet created:", wallets);
      console.log("Recovery Secret:", recoverySecret);
      setMessage("User wallet created");
      // Here you should securely store or display the recovery secret to the user
      setStep(3);
    } catch (error) {
      console.error("Error in handleRegisterPasskeyAndCreateWallet:", error);
      setMessage(`Error registering passkey or creating wallet: ${error}`);
    }
  };

  const handleLogin = async (): Promise<void> => {
    console.log("handleLogin called with email:", email);
    try {
      const userExists = await capsule.checkIfUserExists(email);
      console.log("User exists:", userExists);
      if (userExists) {
        await capsule.login();
        console.log("User logged in successfully");
        setMessage("User logged in successfully");
      } else {
        console.log("User does not exist");
        setMessage("User does not exist. Please create a new account.");
        setStep(1);
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
      setMessage(`Login error: ${error}`);
    }
  };

  const renderStep = () => {
    console.log("renderStep called, current step:", step);
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                console.log("Email input changed:", text);
                setEmail(text);
              }}
              value={email}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                console.log("Verification code input changed:", text);
                setVerificationCode(text);
              }}
              value={verificationCode}
              placeholder="Enter verification code"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyEmail}>
              <Text style={styles.buttonText}>Verify Email</Text>
            </TouchableOpacity>
          </>
        );
      case 3:
        return (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        );
      default:
        console.log("Unknown step:", step);
        return null;
    }
  };

  console.log("Rendering Login component, current step:", step);
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {renderStep()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
  },
});
