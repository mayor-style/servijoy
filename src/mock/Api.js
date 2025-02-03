import { vendors } from "./Vendors";

export const fetchVendors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vendors); // Return vendors after delay
    }, 1500); // Simulate 1.5 sec API delay
  });
};
