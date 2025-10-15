using Microsoft.EntityFrameworkCore;
using ERPLite.Core.Models;

namespace ERPLite.Core.Data;

public class AppDbContext : DbContext 
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  public DbSet<Order> Orders => Set<Order>();
}
