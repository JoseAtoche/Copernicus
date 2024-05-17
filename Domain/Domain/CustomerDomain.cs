using Repository.Repository;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Domain.Domain
{
    public class CustomerDomain(CustomerDbContext context, IMapper mapper)
    {
        private readonly CustomerDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        public List<CustomerDTO> GetAllCustomer()
        {
            var customers = _context.Customers.AsNoTracking().ToList();
            var customersList = _mapper.Map<List<CustomerDTO>>(customers);
            return customersList;
        }

        public CustomerDTO GetCustomerById(int id)
        {

            var customer = _context.Customers.AsNoTracking().FirstOrDefault(x => x.Id == id);
            if (customer == null) return null;
            var customerDTO = _mapper.Map<CustomerDTO>(customer);

            return customerDTO;
        }

        public CustomerDTO CreateCustomer(CustomerDTO customerDTO)
        {
            var customer = _mapper.Map<Customer>(customerDTO);

            customer.Id = _context.GetLastId() + 1;
            customer.CreatedAt ??= DateTime.UtcNow;

            _context.Customers.Add(customer);

            _context.SaveChanges();

            return _mapper.Map<CustomerDTO>(customer);
        }

        public bool UpdateCustomer(CustomerDTO updateCustomerDTO)
        {
            var customer =  _context.Customers.FirstOrDefault(x => x.Id == updateCustomerDTO.Id);

            if (customer == null) return false;

            _mapper.Map(updateCustomerDTO, customer);
            customer.CreatedAt = updateCustomerDTO.CreatedAt ?? customer.CreatedAt ?? DateTime.UtcNow;

            var result =  _context.SaveChanges() > 0;


            return false;
        }

        public bool DeleteCustomer(int id)
        {
            var customer =  _context.Customers.Find(id);

            if (customer == null) return false;

            _context.Customers.Remove(customer);

            var result =  _context.SaveChanges() > 0;

            return result;
        }

    }
}
