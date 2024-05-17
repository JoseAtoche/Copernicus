using AutoMapper;
using Core.Models;
using Domain.Domain;
using Repository.Repository;
using System;
using System.Collections.Generic;

namespace Service.Services
{
    public class CustomerService(CustomerDbContext context, IMapper mapper)
    {
        private readonly CustomerDomain customerDomain = new CustomerDomain(context, mapper);

        public List<CustomerDTO> GetAllCustomer()
        {
            try
            {
                var customers = customerDomain.GetAllCustomer();
                return customers;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en GetAllCustomer: {ex.Message}");
                return null;
            }
        }

        public CustomerDTO GetCustomerById(int id)
        {
            try
            {
                var customer = customerDomain.GetCustomerById(id);
                return customer;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en GetCustomerById: {ex.Message}");
                return null;
            }
        }

        public CustomerDTO CreateCustomer(CustomerDTO clienteDTO)
        {
            try
            {
                var result = customerDomain.CreateCustomer(clienteDTO);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en CreateCustomer: {ex.Message}");
                return null;
            }
        }

        public bool UpdateCustomer(CustomerDTO updateClienteDTO)
        {
            try
            {
                var result = customerDomain.UpdateCustomer(updateClienteDTO);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en UpdateCustomer: {ex.Message}");
                return false;
            }
        }

        public bool DeleteCustomer(int id)
        {
            try
            {
                var result = customerDomain.DeleteCustomer(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en DeleteCustomer: {ex.Message}");
                return false;
            }
        }
    }
}
