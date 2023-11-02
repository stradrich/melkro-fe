// In your store.js or a dedicated file
import { defineStore } from 'pinia';

export const useAdminStores = defineStore('admin', {
  state: () => ({
    selectedItem: null,
  }),

  actions: {
    setSelectedItem(item) {
      this.selectedItem = item;
    },
  },
});
