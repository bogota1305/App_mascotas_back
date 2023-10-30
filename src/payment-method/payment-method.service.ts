import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMethod } from './payment-method.model';

@Injectable()
export class PaymentMethodService {
  private readonly paymentMethods: PaymentMethod[] = [];

  create(paymentMethodData: PaymentMethod): PaymentMethod {

    const paymentMethodId = this.paymentMethods.length + 1;

    const newPaymentMethod: PaymentMethod = { id: paymentMethodId, ...paymentMethodData };

    this.paymentMethods.push(newPaymentMethod);

    return newPaymentMethod;
  }

  findAll(): PaymentMethod[] {
    return this.paymentMethods;
  }

  findById(id: number): PaymentMethod {
    const paymentMethod = this.paymentMethods.find((pm) => pm.id === id);

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    return paymentMethod;
  }

  update(id: number, updatedData: PaymentMethod): PaymentMethod {
    const index = this.paymentMethods.findIndex((pm) => pm.id === id);

    if (index === -1) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    const updatedPaymentMethod = { ...this.paymentMethods[index], ...updatedData };
    this.paymentMethods[index] = updatedPaymentMethod;

    return updatedPaymentMethod;
  }

  remove(id: number): PaymentMethod {
    const index = this.paymentMethods.findIndex((pm) => pm.id === id);

    if (index === -1) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    const removedPaymentMethod = this.paymentMethods[index];
    this.paymentMethods.splice(index, 1);

    return removedPaymentMethod;
  }
}
