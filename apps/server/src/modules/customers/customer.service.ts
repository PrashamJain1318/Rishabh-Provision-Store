import { customerRepository } from "./customer.repository";
import { ICustomer, ICreateCustomerInput, IUpdateCustomerInput } from "./customer.types";

export class CustomerService {
  async getAllCustomers(queryObj: any): Promise<ICustomer[]> {
    return await customerRepository.findAll(queryObj);
  }

  async getCustomerById(id: string): Promise<ICustomer | null> {
    return await customerRepository.findById(id);
  }

  async createCustomer(input: ICreateCustomerInput): Promise<ICustomer> {
    return await customerRepository.create(input);
  }

  async updateCustomer(id: string, input: IUpdateCustomerInput): Promise<ICustomer | null> {
    return await customerRepository.update(id, input);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return await customerRepository.delete(id);
  }
}

export const customerService = new CustomerService();
