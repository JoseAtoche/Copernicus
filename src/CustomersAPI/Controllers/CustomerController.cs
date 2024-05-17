using AutoMapper;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository;
using Service.Services;

namespace CustomersService.Controllers;

[ApiController]
[Route("api/customers")]
public class CustomerController(CustomerDbContext context, IMapper mapper) : ControllerBase
{
    private readonly CustomerService service = new(context, mapper);

    [HttpGet]
    public ActionResult<List<CustomerDTO>> GetAllCustomer()
    {
        var customers = service.GetAllCustomer();
        if (customers == null) return NotFound();
        return customers;
    }

    [HttpGet("{id}")]
    public ActionResult<CustomerDTO> GetCustomer(int id)
    {
        try
        {
            var customer = service.GetCustomerById(id);
            if (customer == null) return NotFound();
            return customer;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex + " Error interno del servidor.");
        }
    }


    [HttpPost]
    public ActionResult<CustomerDTO> CreateCustomer(CustomerDTO createCustomer)
    {

        var result = service.CreateCustomer(createCustomer);

        if (result == null) return BadRequest("No se han podido persistir los datos");

        return result;
    }

    [HttpPut("{id}")]
    public ActionResult UpdateCustomer(string id, CustomerDTO updateCustomer)
    {
        var result = service.UpdateCustomer(updateCustomer);

        if (result) return Ok();

        return BadRequest("ha surgido un problema al modificar al cliente");
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCustomer(int id)
    {
        var result = service.DeleteCustomer(id);

        if (!result) return BadRequest("No se pudo eliminar al cliente");

        return Ok();

    }

}