using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERPLite.Core.Data;
using ERPLite.Core.Models;

namespace ERPLite.Api.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class OrdersController : ControllerBase
  {
    private readonly AppDbContext _context;
    public OrdersController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IEnumerable<Order>> GetOrders() =>
      await _context.Orders.ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
      _context.Orders.Add(order);
      await _context.SaveChangesAsync();
      return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }
  }
}
