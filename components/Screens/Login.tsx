import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import { CAPSULE_API_KEY } from "@/constants/keys";
import { webcrypto } from "crypto";

const Login = () => {
  const capsule = new CapsuleMobile(Environment.BETA, CAPSULE_API_KEY);

  const handleCreateUser = async (email: string): Promise<void> => {
    try {
      await capsule.createUser(email);
      console.log("User created. Verification email sent.");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleVerifyEmail = async (
    code: string
  ): Promise<string | undefined> => {
    try {
      const biometricsId = await capsule.verifyEmailBiometricsId(code);
      console.log("Email verified successfully");
      return biometricsId;
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  const handleRegisterPasskeyAndCreateWallet = async (
    email: string,
    biometricsId: string
  ): Promise<{ wallets: any; recoverySecret: string } | undefined> => {
    try {
      await capsule.registerPasskey(email, biometricsId, webcrypto);
      console.log("Passkey registered successfully");
      const { wallets, recoverySecret } =
        await capsule.createWalletPerMissingType(false);
      console.log("User wallet created");
      //@ts-ignore
      return { wallets, recoverySecret };
    } catch (error) {
      console.error("Error registering passkey or creating wallet:", error);
    }
  };

  const handleNewUserFlow = async (
    email: string,
    verificationCode: string
  ): Promise<void> => {
    await handleCreateUser(email);
    const biometricsId = await handleVerifyEmail(verificationCode);
    if (biometricsId) {
      const result = await handleRegisterPasskeyAndCreateWallet(
        email,
        biometricsId
      );
      if (result) {
        console.log("Wallet created:", result.wallets);
        console.log("Recovery Secret:", result.recoverySecret);
        // Securely display or store the recovery secret for the user
      }
    }
  };

  const handleLogin = async (email: string): Promise<void> => {
    try {
      const userExists = await capsule.checkIfUserExists(email);
      if (userExists) {
        await capsule.login();
        console.log("User logged in successfully");
      } else {
        console.log("User does not exist. Please create a new account.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleNewUserFlow}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
