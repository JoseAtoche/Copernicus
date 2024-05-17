using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repository
{
    public class CustomerDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Customer> Customers { get; set; }

        public int GetLastId()
        {
            var lastCliente = Customers.OrderByDescending(c => c.Id).FirstOrDefault();

            return lastCliente != null ? lastCliente.Id : 0;
        }
    }
}
