import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PaymentMethod } from '../../types';
import { CreditCard, Trash2, Plus } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentMethods() {
  const { user, updateUser } = useStore();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // In a real app, create a payment intent on your backend
    const { clientSecret } = await fetch('/api/create-setup-intent', {
      method: 'POST',
    }).then(r => r.json());

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement('card'),
        billing_details: {
          name: user?.name,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      console.error(result.error);
    } else {
      // Update user with new payment method
      const newPaymentMethod: PaymentMethod = {
        id: result.setupIntent.payment_method,
        type: 'card',
        last4: result.paymentMethod.card.last4,
        brand: result.paymentMethod.card.brand,
        expiryMonth: result.paymentMethod.card.exp_month,
        expiryYear: result.paymentMethod.card.exp_year,
      };

      updateUser({
        ...user,
        paymentMethods: [...(user?.paymentMethods || []), newPaymentMethod],
      });
      setIsAddingCard(false);
    }
  };

  const handleRemoveCard = async (paymentMethodId: string) => {
    // In a real app, detach the payment method on your backend
    await fetch('/api/remove-payment-method', {
      method: 'POST',
      body: JSON.stringify({ paymentMethodId }),
    });

    updateUser({
      ...user,
      paymentMethods: user?.paymentMethods?.filter(pm => pm.id !== paymentMethodId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <button
          onClick={() => setIsAddingCard(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Card</span>
        </button>
      </div>

      <div className="grid gap-4">
        {user?.paymentMethods?.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveCard(method.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {isAddingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
            {/* Stripe Elements would go here in a real implementation */}
            <div className="space-y-4">
              <button
                onClick={handleAddCard}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Card
              </button>
              <button
                onClick={() => setIsAddingCard(false)}
                className="w-full border py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}