import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Address } from '../../types';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function DeliveryAddresses() {
  const { user, updateUser } = useStore();
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressFormData) => {
    const newAddress: Address = {
      id: crypto.randomUUID(),
      ...data,
    };

    if (data.isDefault) {
      // Update other addresses to not be default
      const updatedAddresses = user?.deliveryAddresses?.map(addr => ({
        ...addr,
        isDefault: false,
      })) || [];
      updateUser({
        ...user,
        deliveryAddresses: [...updatedAddresses, { ...newAddress, isDefault: true }],
      });
    } else {
      updateUser({
        ...user,
        deliveryAddresses: [...(user?.deliveryAddresses || []), newAddress],
      });
    }

    setIsAddingAddress(false);
    reset();
  };

  const handleRemoveAddress = (addressId: string) => {
    updateUser({
      ...user,
      deliveryAddresses: user?.deliveryAddresses?.filter(addr => addr.id !== addressId),
    });
  };

  const handleSetDefault = (addressId: string) => {
    updateUser({
      ...user,
      deliveryAddresses: user?.deliveryAddresses?.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Delivery Addresses</h2>
        <button
          onClick={() => setIsAddingAddress(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid gap-4">
        {user?.deliveryAddresses?.map((address) => (
          <div
            key={address.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border"
          >
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium">
                  {address.street}
                  {address.isDefault && (
                    <span className="ml-2 text-sm text-blue-600">(Default)</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-sm text-gray-500">{address.country}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="p-2 text-gray-400 hover:text-blue-600"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleRemoveAddress(address.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('street')}
                  placeholder="Street Address"
                  className="w-full p-2 border rounded-lg"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('city')}
                    placeholder="City"
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('state')}
                    placeholder="State"
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('country')}
                    placeholder="Country"
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('zipCode')}
                    placeholder="ZIP Code"
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isDefault')}
                  id="isDefault"
                  className="mr-2"
                />
                <label htmlFor="isDefault">Set as default address</label>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}