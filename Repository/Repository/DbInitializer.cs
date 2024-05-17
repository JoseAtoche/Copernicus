using Core.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Repository.Repository;

public class DbInitializer
{

    public static async void  InitDb(WebApplication app, string url)
    {        
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetService<CustomerDbContext>();
        if (dbContext != null)
        {
           await RecoverDataWithMigration(dbContext, url);
        }
    }
    private static async Task RecoverDataWithMigration(CustomerDbContext context, string url)
    {

        context.Database.Migrate();

        if (context.Customers.Any())
        {
            Console.WriteLine("Ya existen datos");
            return;
        }

        List<Customer> customerRecuperados = await RecoveryData.RecoveryDataGithubAsync(url);
                
        context.AddRange(customerRecuperados);

        await context.SaveChangesAsync();

    }

}