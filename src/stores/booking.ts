import { create } from 'zustand';
import { makeIdempotencyKey } from '@/lib/api';
import type { Address, Service, TimeSlot } from '@/types/api';

type BookingDraft = {
  service: Service | null; address: Address | null; date: string; slot: TimeSlot | null; problemDescription: string; customerNotes: string; bookingKey: string;
  setService: (service: Service) => void; setAddress: (address: Address) => void; setSchedule: (date: string, slot: TimeSlot) => void;
  setNotes: (problemDescription: string, customerNotes: string) => void; reset: () => void;
};
const initial = () => ({ service: null, address: null, date: '', slot: null, problemDescription: '', customerNotes: '', bookingKey: makeIdempotencyKey('booking') });
export const useBookingDraft = create<BookingDraft>((set) => ({ ...initial(), setService: (service) => set({ service, address: null, date: '', slot: null }), setAddress: (address) => set({ address, date: '', slot: null }), setSchedule: (date, slot) => set({ date, slot }), setNotes: (problemDescription, customerNotes) => set({ problemDescription, customerNotes }), reset: () => set(initial()) }));
