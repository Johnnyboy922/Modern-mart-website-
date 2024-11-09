import { useState } from 'react';
import { DeliveryOption } from '../../types';
import { Truck, Clock, DollarSign } from 'lucide-react';

interface DeliveryOptionsProps {
  options: DeliveryOption[];
  onSelect: (option: DeliveryOption) => void;
  selectedOption?: DeliveryOption;
}

export default function DeliveryOptions({
  options,
  onSelect,
  selectedOption,
}: DeliveryOptionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose Delivery Method</h2>
      <div className="grid gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
              selectedOption?.id === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Truck className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="font-medium">{option.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {option.estimatedDays} days
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selectedOption?.id === option.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedOption?.id === option.id && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}