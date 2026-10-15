import type { ConfirmationResult } from '@react-native-firebase/auth';
import { getAuth, signInWithPhoneNumber, signOut } from '@react-native-firebase/auth';

let pendingConfirmation: ConfirmationResult | null = null;
let verifiedIdToken: string | null = null;

function readableFirebaseError(error: unknown): Error {
  const value = error as { code?: string; message?: string };
  const messages: Record<string, string> = {
    'auth/invalid-phone-number': 'Enter a valid mobile number.',
    'auth/invalid-verification-code': 'That OTP is incorrect. Please try again.',
    'auth/code-expired': 'That OTP has expired. Please request a new one.',
    'auth/session-expired': 'That OTP has expired. Please request a new one.',
    'auth/too-many-requests': 'Too many attempts. Please wait before trying again.',
    'auth/quota-exceeded': 'SMS quota has been reached. Please try again later.',
    'auth/network-request-failed': 'Check your internet connection and try again.',
    'auth/app-not-authorized': 'This app is not authorized for Firebase Phone Authentication.',
  };

  return new Error((value.code && messages[value.code]) || value.message || 'Unable to complete phone verification.');
}

export async function requestFirebaseOtp(phoneNumber: string) {
  try {
    verifiedIdToken = null;
    pendingConfirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
  } catch (error) {
    throw readableFirebaseError(error);
  }
}

export async function confirmFirebaseOtp(code: string) {
  if (verifiedIdToken) return verifiedIdToken;

  if (!pendingConfirmation) {
    throw new Error('Your verification session ended. Go back and request a new OTP.');
  }

  try {
    const credential = await pendingConfirmation.confirm(code);
    verifiedIdToken = await credential.user.getIdToken(true);
    pendingConfirmation = null;
    return verifiedIdToken;
  } catch (error) {
    throw readableFirebaseError(error);
  }
}

export function clearFirebaseOtpState() {
  pendingConfirmation = null;
  verifiedIdToken = null;
}

export async function signOutFirebase() {
  clearFirebaseOtpState();
  if (getAuth().currentUser) await signOut(getAuth());
}
