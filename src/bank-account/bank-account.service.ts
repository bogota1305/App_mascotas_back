import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccount } from './bank-account.model';

@Injectable()
export class BankAccountService {
  private readonly bankAccounts: BankAccount[] = [];

  create(bankAccountData: BankAccount): BankAccount {

    const bankAccountId = this.bankAccounts.length + 1;

    const newBankAccount: BankAccount = { id: bankAccountId, ...bankAccountData };

    this.bankAccounts.push(newBankAccount);

    return newBankAccount;
  }

  findAll(): BankAccount[] {
    return this.bankAccounts;
  }

  findById(id: number): BankAccount {
    const bankAccount = this.bankAccounts.find((ba) => ba.id === id);

    if (!bankAccount) {
      throw new NotFoundException(`Bank account with ID ${id} not found`);
    }

    return bankAccount;
  }

  update(id: number, updatedData: BankAccount): BankAccount {
    const index = this.bankAccounts.findIndex((ba) => ba.id === id);

    if (index === -1) {
      throw new NotFoundException(`Bank account with ID ${id} not found`);
    }

    const updatedBankAccount = { ...this.bankAccounts[index], ...updatedData };
    this.bankAccounts[index] = updatedBankAccount;

    return updatedBankAccount;
  }

  remove(id: number): BankAccount {
    const index = this.bankAccounts.findIndex((ba) => ba.id === id);

    if (index === -1) {
      throw new NotFoundException(`Bank account with ID ${id} not found`);
    }

    const removedBankAccount = this.bankAccounts[index];
    this.bankAccounts.splice(index, 1);

    return removedBankAccount;
  }
}
