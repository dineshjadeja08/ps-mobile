import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type Language = 'en' | 'ta';
const STORAGE_KEY = 'purple-squad-language-v1';

const en = {
  home: 'Home', trending: 'Trending', services: 'Services', bookings: 'Bookings', orders: 'Orders', profile: 'Profile',
  serviceLocation: 'Service location', chooseLocation: 'Choose your location', enterPincode: 'Enter 6-digit pincode', useCurrent: 'Use current',
  searchPlaceholder: 'Search for AC repair, cleaning…', searchResults: 'Search results', clear: 'Clear', chooseService: 'Choose a service', seeAll: 'See all', viewAll: 'View all',
  reliableTitle: 'Reliable home service, right on time.', bookNow: 'Book now', verifiedPros: 'Verified pros', upfrontPrice: 'Upfront price', easyBooking: 'Easy booking', popularServices: 'Popular services',
  noMatches: 'No matching services', tryAnother: 'Try another service name.', availableIn: 'Available in', unavailableArea: 'Service is not available at this pincode yet.',
  account: 'Account', signIn: 'Sign in', signOut: 'Sign out', helpSupport: 'Help & support', callSupport: 'Call support', whatsappSupport: 'WhatsApp support', privacyPolicies: 'Privacy and policies', language: 'Language',
  yourBookings: 'Your bookings', browseServices: 'Browse services', noBookings: 'No bookings yet', total: 'Total', startsAt: 'Starts at', view: 'View', verified: 'Verified',
} as const;

type TranslationKey = keyof typeof en;
const ta: Record<TranslationKey, string> = {
  home: 'முகப்பு', trending: 'டிரெண்டிங்', services: 'சேவைகள்', bookings: 'முன்பதிவுகள்', orders: 'ஆர்டர்கள்', profile: 'சுயவிவரம்',
  serviceLocation: 'சேவை இடம்', chooseLocation: 'உங்கள் இடத்தைத் தேர்ந்தெடுக்கவும்', enterPincode: '6 இலக்க அஞ்சல் குறியீடு', useCurrent: 'தற்போதைய இடம்',
  searchPlaceholder: 'ஏசி பழுது, சுத்தம் போன்றவற்றைத் தேடுங்கள்…', searchResults: 'தேடல் முடிவுகள்', clear: 'அழி', chooseService: 'ஒரு சேவையைத் தேர்வு செய்யுங்கள்', seeAll: 'அனைத்தும்', viewAll: 'அனைத்தையும் காண்க',
  reliableTitle: 'நம்பகமான வீட்டு சேவை, சரியான நேரத்தில்.', bookNow: 'இப்போது பதிவு செய்க', verifiedPros: 'சரிபார்க்கப்பட்ட நிபுணர்கள்', upfrontPrice: 'முன்கூட்டிய விலை', easyBooking: 'எளிய முன்பதிவு', popularServices: 'பிரபலமான சேவைகள்',
  noMatches: 'பொருத்தமான சேவை இல்லை', tryAnother: 'வேறு சேவை பெயரை முயற்சிக்கவும்.', availableIn: 'சேவை கிடைக்கும் இடம்', unavailableArea: 'இந்த அஞ்சல் குறியீட்டில் சேவை இன்னும் கிடைக்கவில்லை.',
  account: 'கணக்கு', signIn: 'உள்நுழைக', signOut: 'வெளியேறு', helpSupport: 'உதவி மற்றும் ஆதரவு', callSupport: 'அழைப்பு ஆதரவு', whatsappSupport: 'வாட்ஸ்அப் ஆதரவு', privacyPolicies: 'தனியுரிமை மற்றும் கொள்கைகள்', language: 'மொழி',
  yourBookings: 'உங்கள் முன்பதிவுகள்', browseServices: 'சேவைகளைப் பாருங்கள்', noBookings: 'முன்பதிவுகள் இல்லை', total: 'மொத்தம்', startsAt: 'தொடக்க விலை', view: 'காண்க', verified: 'சரிபார்க்கப்பட்டது',
};

const dictionaries: Record<Language, Record<TranslationKey, string>> = { en, ta };
type LanguageState = { language: Language; ready: boolean; hydrate: () => Promise<void>; setLanguage: (language: Language) => Promise<void> };

export const useLanguage = create<LanguageState>((set) => ({
  language: 'en', ready: false,
  hydrate: async () => { const saved = await AsyncStorage.getItem(STORAGE_KEY); set({ language: saved === 'ta' ? 'ta' : 'en', ready: true }); },
  setLanguage: async (language) => { await AsyncStorage.setItem(STORAGE_KEY, language); set({ language }); },
}));

export function useT() {
  const language = useLanguage((state) => state.language);
  return (key: TranslationKey) => dictionaries[language][key];
}
